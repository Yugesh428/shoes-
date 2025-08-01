import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
} from "sequelize-typescript";
import User from "./userModel";

@Table({
  tableName: "addresses",
  modelName: "Address",
  timestamps: true,
})
class Address extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare street: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare city: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare state: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare country: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare postalCode: string;
}

export default Address;
