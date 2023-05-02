import {
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    Length,
    Model,
    Table,
    Unique,
} from 'sequelize-typescript';
import { UserEntity } from 'src/user/user.entity';

@Table
export class SettingsEntity extends Model<SettingsEntity> {
    @ForeignKey(() => UserEntity)
    @Column
    userId: number;

    @BelongsTo(() => UserEntity)
    userEntity: UserEntity;

    @Length({ max: 11 })
    @Default(null)
    @Unique
    @Column
    phone: string;

    @Column
    email: string;

    @Default('light')
    @Column
    theme: string;

    @Default([])
    @Column(DataType.ARRAY(DataType.STRING))
    notification: string[];
}
