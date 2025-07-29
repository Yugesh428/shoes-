import {
  Table,
  PrimaryKey,
  Column,
  Model,
  DataType,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "user",
  modelName: "User",
  timestamps: true,
})
class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false, // ← missing comma was here
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.ENUM("scheduled", "completed", "cancelled", "no_show"),
    defaultValue: "scheduled",
  })
  declare status: "scheduled" | "completed" | "cancelled" | "no_show";

  @Column({
    type: DataType.ENUM("male", "female", "other"),
  })
  declare gender: "male" | "female" | "other";

  @Column({
    type: DataType.ENUM("customer", "admin", "super_admin"),
    defaultValue: "customer",
  })
  declare role: "customer" | "admin" | "super-admin";

  @Column({
    type: DataType.STRING,
  })
  declare currentClinicNumber: string;
}

export default User;
