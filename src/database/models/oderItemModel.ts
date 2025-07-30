import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Default,
  BelongsTo,
} from "sequelize-typescript";
import Order from "./orderModel";
import Shoes from "./shoesModel";

@Table({
  tableName: "order_items",
  modelName: "OrderItem",
  timestamps: true,
})
class OrderItem extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare orderId: string;

  @BelongsTo(() => Order)
  declare order: Order;

  @ForeignKey(() => Shoes)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare shoeId: string;

  @BelongsTo(() => Shoes)
  declare shoe: Shoes;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  declare quantity: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  declare price: number;
}

export default OrderItem;
