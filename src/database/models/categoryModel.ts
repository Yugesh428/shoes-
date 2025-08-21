import { DataTypes, Model } from "sequelize";
import sequelize from "../../database/connection";

class ShoeCategory extends Model {
  public id!: string;
  public name!: string;
  public description?: string;
  public photo?: string; // optional
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ShoeCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING, // stores URL or file path
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "shoe_categories",
    timestamps: true,
  }
);

export default ShoeCategory;
