import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { StudentRepository } from './student.repository';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { ClassModule } from '../class/class.module';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity]), ClassModule],
  controllers: [StudentController],
  providers: [StudentRepository, StudentService],
  exports: [StudentService, StudentRepository],
})
export class StudentModule {}
