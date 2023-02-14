import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class WorkerEntity extends Model<WorkerEntity> {

    @Column
    name: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    dateOfBirth: Date;

    @Column
    sity: string;

    @Column
    school: string;

    @Column
    inn: string;

    @Column
    work: string;

    @Column
    cv: string;
}