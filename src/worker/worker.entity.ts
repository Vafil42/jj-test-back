import { Table, Column, Model } from 'sequelize-typescript';
import { Injectable } from '@nestjs/common';

@Injectable()
@Table
export class WorkerEntity extends Model {
    @Column
    id: number;

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
    cv: Text;
}