import { BadRequestException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationRepository } from './notification.repository';
import { NotificationEntity } from './notification.entity';
import { User } from '../user/user.entity';
import { NotificationType } from 'src/shared/types/EnumNotificationType';
import { Class } from '../class/class.entity';
import { GradeStructure } from '../grade-structure/grade-structure.entity';
import { GradeReviewComment } from '../grade-review-comment/grade-review-comment.entity';
import { UserService } from '../user/user.service';
import { NotificationRespDto } from './dto/res/NotificationResponse';
import { UserRespDTO } from '../user/dto/response/UserResp';
import { GradeService } from '../grade/grade.service';
import { GradeReview } from '../grade-review/grade-review.entity';
import { ClassUserService } from '../classUser/class-user.service';
import { NotificationGateWay } from './notification.gateway';
import { UserRole } from 'src/shared/types/EnumUserRole';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationRepository)
    private readonly notificationRepository: NotificationRepository,
    private readonly notificationGateway: NotificationGateWay,
    private readonly userService: UserService,
    @Inject(forwardRef(() => GradeService))
    private readonly gradeService: GradeService,
    private readonly classUserService: ClassUserService,
  ) {}

  async createNotification(senderId: number, receiverId: number, notificationType: NotificationType, classRoom?: Class,grade?: GradeStructure, review?:GradeReview ): Promise<NotificationRespDto> {
    
    const sender = await this.userService.findById(senderId);
    const receiver = await this.userService.findById(receiverId);
    const notification = new NotificationEntity();
    notification.sender = sender;
    notification.receiver = receiver;
    notification.notificationType = notificationType;
    notification.class = classRoom;
    notification.grade = grade;
    if(review != null){
      notification.review = review;
    }


    const savedNotification = await this.notificationRepository.save(notification);

    const notificationDto: NotificationRespDto = {
        id: savedNotification.id,
        sender,
        receiver,
        notifycationType: savedNotification.notificationType,
        isRead: savedNotification.isRead,
        classId: savedNotification.class.idCode,
        gradeStructure: savedNotification.grade?.id,
        reviewId: savedNotification.review?.id,
        createdAt: savedNotification.createdAt,
    };
    this.notificationGateway.handleNewNotification(notificationDto);
    return notificationDto;

  }

  async createNotificationWhenFinalizeByStructureId(senderId: number,structureId: number){
    
    const grades = await this.gradeService.findGradesByStructureId(structureId);
    grades.forEach(async grade =>{
        const user = await this.userService.findByStudentId(grade.studentId);
        if(user){
          const classroom = await grade.gradeStructure.class;
          const role = await this.classUserService.findRole(classroom.idCode,user.id);
          if(user && role==UserRole.HS){
            await this.createNotification(senderId,user.id,NotificationType.FinalizedGradeComposition,classroom,grade.gradeStructure);
          }  
        }
        
    })
  }

  async creatteNotificationForAllTeacherOfClass(senderId:number,notificationType: NotificationType, classRoom: Class,grade?: GradeStructure, review?:GradeReview ){
    const teachers =  (await this.classUserService.getStudentsAndTeachersByClassId(classRoom.idCode)).teachers;
    teachers.forEach(async teacher => {
        await this.createNotification(senderId,teacher.id,notificationType,classRoom,grade,review);
    });
  }

  async getNotificationsByReceiverId(receiverId: number): Promise<NotificationRespDto[]> {
    const receiver = await this.userService.findById(receiverId);
    if(!receiver){
        throw new BadRequestException("User not exist");
    }

    const notifications  = await this.notificationRepository.find({
        where:{
            receiver:{id:receiverId}
        },
        order: {
          createdAt: 'DESC', 
        },
        
     });

     const result : NotificationRespDto[]= [];
     
     notifications.forEach(async notify => {
        const sender: UserRespDTO = {
            id: notify.sender.id,
            fullname: notify.sender.fullname,
            email: notify.sender.email,
            studentId: notify.sender.studentId
        };

        const receiver: UserRespDTO = {
            id: notify.receiver.id,
            fullname: notify.receiver.fullname,
            email: notify.sender.email,
            studentId: notify.sender.studentId
        };

        
        const notificationDto: NotificationRespDto = {
            id: notify.id,
            sender,
            receiver,
            notifycationType: notify.notificationType,
            isRead: notify.isRead,
            classId:  notify.class?.idCode,
            gradeStructure:  notify.grade?.id,
            reviewId:  notify.review?.id,
            createdAt: notify.createdAt,
        };

        result.push(notificationDto);

     })
    

     return result;
  }

  async markNotificationAsRead(notificationId: number): Promise<NotificationRespDto> {
    const notification = await this.notificationRepository.findOne({
        where:{
            id:notificationId,
        }
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${notificationId} not found`);
    }

    notification.isRead = true;
    
    const updatedNotification = await this.notificationRepository.save(notification);

    const sender: UserRespDTO = {
        id: updatedNotification.sender.id,
        fullname: updatedNotification.sender.fullname,
        email: updatedNotification.sender.email,
        studentId: updatedNotification.sender.studentId
    };

    const receiver: UserRespDTO = {
        id: updatedNotification.receiver.id,
        fullname: updatedNotification.receiver.fullname,
        email: updatedNotification.sender.email,
        studentId: updatedNotification.sender.studentId
    };

    const notificationDto: NotificationRespDto = {
        id: updatedNotification.id,
        sender,
        receiver,
        notifycationType: updatedNotification.notificationType,
        isRead: updatedNotification.isRead,
        classId: updatedNotification.class.idCode,
        gradeStructure: updatedNotification.grade?.id,
        reviewId: updatedNotification.review?.id,
        createdAt: updatedNotification.createdAt,
        
    };

    return notificationDto;

    
  }
}