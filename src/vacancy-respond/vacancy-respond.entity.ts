import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class VacancyRespondEntity extends Model<VacancyRespondEntity> {
    @Column
    vacancyHref: string;

    @Column
    userId: number;
}
