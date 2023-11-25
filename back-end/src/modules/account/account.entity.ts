import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('accounts')
export class Account {
  @PrimaryColumn({ unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, name: 'access_token' })
  accessToken: string;

  @Column({ nullable: true, name: 'refresh_token' })
  refreshToken: string;
}
