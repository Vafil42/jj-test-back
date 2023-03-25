import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { SettingsEntity } from './settings.entity';

@Injectable()
export class SettingsService {
    constructor(
        @Inject('SETTINGS_REPOSITORY')
        private settingsRepository: typeof SettingsEntity,
    ) {}

    async create(user: UserEntity) {
        return await this.settingsRepository.create({
            email: user.email,
            userId: user.id,
            userEntity: user,
        })
    }
}
