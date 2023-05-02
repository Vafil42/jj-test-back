import {
    Inject,
    Injectable,
    InternalServerErrorException,
    NotImplementedException,
} from '@nestjs/common';
import { UserEntity } from 'src/user/user.entity';
import { SettingsEntity } from './settings.entity';

@Injectable()
export class SettingsService {
    constructor(
        @Inject('SETTINGS_REPOSITORY')
        private settingsRepository: typeof SettingsEntity,
    ) {}

    async create(user: UserEntity) {
        try {
            return await this.settingsRepository.create({
                email: user.email,
                userId: user.id,
                userEntity: user,
            });
        } catch (e) {
            throw new InternalServerErrorException('Iternal server error', e);
        }
    }
}
