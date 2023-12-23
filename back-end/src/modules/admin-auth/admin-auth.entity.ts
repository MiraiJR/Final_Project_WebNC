import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SALT_HASH_PWD } from 'src/shared/configs/salt';

@Entity('admin-accounts')
export class AdminAccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, default: null, name: 'access_token' })
  accessToken: string;

  @Column({ nullable: true, default: null, name: 'refresh_token' })
  refreshToken: string;

  @BeforeInsert()
  async encryptPassword() {
    const salt = await SALT_HASH_PWD;
    this.password = await bcrypt.hash(this.password, salt);
  }

  convertToResp(): AdminAccountResp {
    const resp: AdminAccountResp = {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };

    return resp;
  }
}
