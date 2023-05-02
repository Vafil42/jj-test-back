import { Model, Table, Column, Default } from 'sequelize-typescript';

@Table
export class ReviewEntity extends Model<ReviewEntity> {
    @Column
    authorId: number;

    @Column
    userId: number;

    @Column
    review: number;

    @Default(null)
    @Column
    body: string;

    @Default(true)
    @Column
    show: boolean;
}
