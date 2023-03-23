import { Column, Model, Table, Unique } from "sequelize-typescript";

@Table
export class CategoryEntity extends Model<CategoryEntity> {
    @Unique
    @Column
    title: string;

    @Column
    icon: string;

    @Unique
    @Column
    href: string;
}