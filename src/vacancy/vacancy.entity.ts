import { Column, Default, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class UserEntity extends Model<UserEntity> {
  // required, unique
  @Unique
  @Column
  title: string;

  // required
  @Column
  author: string;

  // required, default = null
  @Default(null)
  @Column
  avatar: string;

  // default = true
  @Default(true)
  @Column
  show: boolean;

  // default = "homeTask"
  @Default('homeTask')
  @Column
  category: string;

  // default = null
  @Default(null)
  @Column
  timestamp: string;

  // default = 6700
  @Default(6700)
  @Column
  region: number;

  // default = 1
  @Default(1)
  @Column
  priority: number;

  // default = null
  @Default(null)
  @Column
  body: string;

  // default = false
  @Default(false)
  @Column
  requiredExp: boolean;
}
