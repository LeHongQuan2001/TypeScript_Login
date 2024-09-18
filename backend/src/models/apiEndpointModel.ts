import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ApiEndpointAttributes {
  id?: number;
  method: string;
  path: string;
  description: string;
}

@Table({
  tableName: "apiendpoints",
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["method", "path"],
    },
  ]
})
class ApiEndpoint extends Model<ApiEndpointAttributes> implements ApiEndpointAttributes
{
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public method!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public path!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public description!: string;

  public readonly createdAt!: Date;
}

export default ApiEndpoint;
