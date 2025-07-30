import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "shoes",
  modelName: "Shoes",
  timestamps: true,
})
class Shoes extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare brand: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare image?: string;

  @Column({
    type: DataType.ENUM("available", "outOfStock"),
    allowNull: false,
  })
  declare stock: "available" | "outOfStock";

  @Column({
    type: DataType.ENUM("male", "female", "child"),
    allowNull: false,
  })
  declare category: "male" | "female" | "child";
}

export default Shoes;
