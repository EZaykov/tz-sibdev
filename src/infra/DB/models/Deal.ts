import { DataTypes, Model } from "sequelize";
import { Deal } from "../../../domain/Deal/Deal";
import sequelize from "../DB";

export class DealModel extends Model implements Deal {
  clientUsername!: string;
  gemName!: string;
  gemQuantity!: number;
  total!: number;
  date!: Date;
}

DealModel.init(
  {
    id: {
      type: DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true
    },
    clientUsername: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    gemName: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    gemQuantity: {
      type: DataTypes.TINYINT(),
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER(),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Deal",
  }
);
