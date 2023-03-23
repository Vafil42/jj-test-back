import { SettingsEntity } from "./settings.entity";

export const settingsProviders = [
    {
        provide: 'SETTINGS_REPOSITORY',
        useValue: SettingsEntity,
    },
]