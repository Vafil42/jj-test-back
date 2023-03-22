import { Table, Model, Default, Column } from 'sequelize-typescript';

@Table
export class ArticleEntity extends Model<ArticleEntity> {
  @Default(null)
  @Column
  title: string;

  @Default('')
  @Column
  body: string;

  @Column
  autorId: number;

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
