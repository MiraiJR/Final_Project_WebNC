import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './grade.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Grade])],
  controllers: [],
  providers: [],
  exports: [],
})
export class GradeModule {}
