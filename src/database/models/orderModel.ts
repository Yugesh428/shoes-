import {
  PrimaryKey,
  Column,
  Model,
  DataType,
  Default,
  Table,
  ForeignKey,
} from "sequelize-typescript";
import User from "./userModel"; // assuming default export

@Table({
  tableName: "order",
  modelName: "Order",
  timestamps: true,
})
class Order extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare userId: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare orderDate: string;

  @Column({
    type: DataType.ENUM("pending", "completed", "cancelled"),
  })
  declare status: "pending" | "completed" | "cancelled";
  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  declare total_amount: number;
}

export default Order;
