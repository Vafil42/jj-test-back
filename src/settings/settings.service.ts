import { Inject, Injectable } from '@nestjs/common';
import { SettingsEntity } from './settins.entity';

@Injectable()
export class SettingsService {
    constructor(
        @Inject('SETTINGS_REPOSITORY')
        settingsRepository: typeof SettingsEntity;
    ) {}
}
