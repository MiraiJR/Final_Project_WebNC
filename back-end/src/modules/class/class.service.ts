import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './class.entity';
import { Repository } from 'typeorm';
import { ClassRepository } from './class.repository';
import { CreateClassDto } from './dto/class/CreateClass.dto';
import { UserService } from '../user/user.service';
import { ClassResponseDto } from './dto/class/ClassResponse.dto';

@Injectable()
export class ClassService {
    constructor(
        private classRepository: ClassRepository,
        private userService : UserService,
        ) {}

    async create(createClassDto : CreateClassDto,creatorId:number): Promise<ClassResponseDto>{
        const creator = await this.userService.findById(creatorId);
        if(!creator){
            throw new BadRequestException("User not exist")
        }
        const newClass = this.classRepository.create({...createClassDto,creator:creator});
        await  this.classRepository.save(newClass);

        const classResponse: ClassResponseDto = {
            title: newClass.title,
            creatorId: newClass.creator.id,
            idCode: newClass.idCode,
        }

        return classResponse
    }

    async findByIdCode(idCode: string): Promise<Class>{
        return this.classRepository.findOne({
            where: {
                idCode,
              },
        })
    }


}
