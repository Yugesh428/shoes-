import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Default,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";
import Shoe from "./shoesModel";

@Table({
  tableName: "inventory_stock",
  timestamps: true,
})
class InventoryStock extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @ForeignKey(() => Shoe)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  shoeId!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  quantity!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  reorderLevel?: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location?: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}

export default InventoryStock;
