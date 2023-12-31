import { Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { UserId } from 'src/shared/decorators/userid.decorator';
import { NotificationRespDto } from './dto/res/NotificationResponse';
import { AuthGuard } from 'src/shared/guards/AuthGuard';

@Controller('notifications') 
@UseGuards(AuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getNotificationOfUser(@UserId() id: number) : Promise<NotificationRespDto[]> {
    return await this.notificationService.getNotificationsByReceiverId(id);
  }

  @Patch(':id/mark-as-read')
  async markNotificationAsRead(@Param('id') id: number) : Promise<NotificationRespDto> {
    return await this.notificationService.markNotificationAsRead(id);
    
  }
}