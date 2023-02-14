import { Table, Column, Model, PrimaryKey, Default, Unique } from 'sequelize-typescript';

@Table
export class UserEntity extends Model<UserEntity> {
    @PrimaryKey
    @Column
    id: number;

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
    bannned: boolean;

    @Default([])
    @Column
    permission: string[];

    @Default(0)
    @Column
    age: number;

    @Default(null)
    @Column
    birsday: string;

    @Default(null)
    @Column
    learn: string;

    @Default(null)
    @Column
    inn: string;
    
    @Default(null)
    @Column
    city: string;

    @Default("")
    @Column
    about: string;

    @Default(0)
    @Column
    feedback: number;

    @Default('USER')
    @Column
    role: string;
}