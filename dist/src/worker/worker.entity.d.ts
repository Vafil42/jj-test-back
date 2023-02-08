import { Model } from 'sequelize-typescript';
export declare class WorkerEntity extends Model<WorkerEntity> {
    name: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    sity: string;
    school: string;
    inn: string;
    work: string;
    cv: string;
}
