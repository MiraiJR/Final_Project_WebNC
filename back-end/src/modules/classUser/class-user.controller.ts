import { Body, Controller,Get,HttpCode,HttpStatus,Param,Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from "src/shared/guards/AuthGuard";
import { ClassUserService } from './class-user.service';
import { UserId } from 'src/shared/decorators/userid.decorator';


@Controller()
@UseGuards(AuthGuard)
export class ClassUserController{
    constructor(
        private readonly classUserService: ClassUserService,
        ) {}

}