import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { settingsProviders } from './settings.providers';

@Module({
    imports: [],
    providers: [SettingsService, ...settingsProviders],
    controllers: [SettingsController],
    exports: [SettingsService],
})
export class SettingsModule {}
