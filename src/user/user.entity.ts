import { JSON } from 'sequelize';
import {
  Table,
  Column,
  Model,
  Default,
  Unique,
  HasOne,
  DataType,
} from 'sequelize-typescript';
import { SettingsEntity } from 'src/settings/settings.entity';

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

  @Default(false)
  @Column
  emailVerified: boolean;

  @Column
  tokenPass: string;

  @Column
  password: string;

  @Default(false)
  @Column
  banned: boolean;

  @Default([])
  @Column(DataType.ARRAY(DataType.STRING))
  permissions: string[];

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
