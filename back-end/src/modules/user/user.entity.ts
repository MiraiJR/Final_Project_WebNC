import { UserRole } from 'src/shared/types/EnumUserRole';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LockedUserEntity } from '../locked-user/locked-user.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  fullname: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true, name: 'access_token' })
  accessToken: string;

  @Column({ nullable: true, name: 'refresh_token' })
  refreshToken: string;

  @Column({ nullable: true, name: 'facebook_id' })
  facebookId: string;

  @Column({ nullable: true, name: 'google_id' })
  googleId: string;

  @Column({ nullable: true })
  studentId: string;

  @Column({ nullable: false, default: false })
  isBanned: boolean;

  @OneToOne(() => LockedUserEntity, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  locked: LockedUserEntity;

  convertToResp(): UserManagementResp {
    const resp: UserManagementResp = {
      id: this.id,
      email: this.email,
      fullname: this.fullname,
      facebookId: !!this.facebookId,
      googleId: !!this.googleId,
      studentId: this.studentId,
      isBanned: this.isBanned,
      locked: this.locked
        ? {
            lockedAt: this.locked.lockedAt,
            duration: this.locked.duration,
          }
        : null,
    };

    return resp;
  }
}
