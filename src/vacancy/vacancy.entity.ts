import { IsNotEmpty } from 'class-validator';
import {
    Column,
    DataType,
    Default,
    Model,
    Table,
    Unique,
} from 'sequelize-typescript';

@Table
export class VacancyEntity extends Model<VacancyEntity> {
    // required, unique
    @IsNotEmpty()
    @Unique
    @Column
    title: string;

    @Unique
    @Column
    href: string;

    // required
    @IsNotEmpty()
    @Column
    authorId: number;

    // required, default = null
    @Default(null)
    @Column
    avatar: string;

    // default = true
    @Default(false)
    @Column
    show: boolean;

    // default = "homeTask"
    @Default('homeTask')
    @Column
    category: string;

    // default = null
    @Default([])
    @Column(DataType.ARRAY(DataType.STRING))
    timestamp: string[];

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

    @Default(false)
    @Column
    moderate: boolean;
}
