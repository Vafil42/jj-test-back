import { Table, Model, Default, Column, Unique } from 'sequelize-typescript';
@Table
export class ArticleEntity extends Model<ArticleEntity> {
  @Default(null)
  @Column
  title: string;

  @Default('')
  @Column
  body: string;

  @Column
  autor: number;

  @Default(true)
  @Column
  show: boolean;

  @Default('')
  @Column
  avatar: string;

  @Column
  href: string;

  @Default(true)
  @Column
  visibilite: boolean;
}
