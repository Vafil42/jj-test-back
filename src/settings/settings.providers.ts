import { SettingsEntity } from "./settins.entity";

export const settingsProviders = [
    {
        provide: 'SETTINGS_REPOSITORY',
        useValue: SettingsEntity,
    },
]