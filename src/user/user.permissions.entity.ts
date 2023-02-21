import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { UserEntity } from './user.entity';

@Table
export class UserPermissionEntity extends Model<UserPermissionEntity> {
  @ForeignKey(() => UserEntity)
  @Column
  userId: number;

  @BelongsTo(() => UserEntity)
  userEntity: UserEntity;

  @Column
  permission: string;
}
