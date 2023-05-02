import { Column, DataType, Model, Default, Table } from "sequelize-typescript";

@Table
export class ClaimEntity extends Model<ClaimEntity> {
    @Column
    name: string;

    @Column
    phone: string;

    @Column
    body: string;

    @Default([])
    @Column(DataType.ARRAY(DataType.STRING))
    image: string[];

    @Default(false)
    @Column
    moderated: boolean;

    @Column
    email: string;
}