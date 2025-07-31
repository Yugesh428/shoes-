// models/reviewModel.ts

import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  PrimaryKey,
  Default,
} from "sequelize-typescript";
import User from "./userModel";
import Shoes from "./shoesModel"; // or Clinic if you're doing ClinicX

@Table({
  tableName: "reviews",
  modelName: "Review",
  timestamps: true,
})
class Review extends Model {
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

  @ForeignKey(() => Shoes) // or Clinic
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  declare shoeId: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  })
  declare rating: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare comment: string;
}

export default Review;
