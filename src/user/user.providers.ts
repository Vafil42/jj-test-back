import { UserEntity } from './user.entity';
import { UserPermissionEntity } from './user.permissions.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: UserEntity,
  },
  {
    provide: 'USER_PERMISSION_REPOSITORY',
    useValue: UserPermissionEntity,
  },
];
