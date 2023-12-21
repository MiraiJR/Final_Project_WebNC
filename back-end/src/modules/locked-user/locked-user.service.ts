import { Injectable } from '@nestjs/common';
import { LockedUserRepository } from './locked-user.repository';
import { LockedUserEntity } from './locked-user.entity';

@Injectable()
export class LockedUserService {
  constructor(private readonly lockedUserRepository: LockedUserRepository) {}

  async create(userId: number, duration: number): Promise<LockedUserEntity> {
    await this.lockedUserRepository.save({
      duration,
      userId,
      lockedAt: new Date(),
    });
    const lockedUser = await this.lockedUserRepository.findByUserId(userId);
    return lockedUser;
  }

  async delete(userId: number): Promise<void> {
    await this.lockedUserRepository.delete(userId);
  }
}
