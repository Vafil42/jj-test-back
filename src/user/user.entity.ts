import { JSON } from 'sequelize';
import {
  Table,
  Column,
  Model,
  Default,
  Unique,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { SettingsEntity } from 'src/settings/settins.entity';
import { UserPermissionEntity } from './user.permissions.entity';

@Table
export class UserEntity extends Model<UserEntity> {
  @Default(null)
  @Column
  lastname: string;

  @Default(null)
  @Column
  firstname: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @Default(false)
  @Column
  banned: boolean;

  @HasMany(() => UserPermissionEntity)
  permissions: UserPermissionEntity[];

  @Default('physical')
  @Column
  implication: string;

  @Default(null)
  @Column
  birthday: string;

  @Default(null)
  @Column
  learn: string;

  @Default(null)
  @Column
  inn: string;

  @Column(JSON)
  region: JSON;

  @Default(null)
  @Column
  city: string;

  @Default('')
  @Column
  about: string;

  @Default(0)
  @Column
  feedback: number;

  @Default('USER')
  @Column
  role: string;

  @HasOne(() => SettingsEntity)
  settingsEntity: SettingsEntity;
}

export { UserPermissionEntity };
