import { UserRole } from 'src/shared/types/EnumUserRole';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
