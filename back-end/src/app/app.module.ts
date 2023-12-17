import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ClassModule } from 'src/modules/class/class.module';
import { GradeStructureModule } from 'src/modules/grade-structure/grade-structure.module';
import { ClassUserModule } from 'src/modules/classUser/class-user.module';
import { GradeModule } from 'src/modules/grade/grade.module';
import { MailModule } from 'src/modules/mail/mail.module';
import { UserModule } from 'src/modules/user/user.module';
import { StudentModule } from 'src/modules/student/student.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MailModule,
    ClassModule,
    ClassUserModule,
    GradeStructureModule,
    GradeModule,
    StudentModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true, cache: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
