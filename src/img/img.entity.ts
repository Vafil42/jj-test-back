import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class ImgEntity extends Model<ImgEntity> {
  @Column
  namefile: string;

  @Column
  directiry: string;
}
