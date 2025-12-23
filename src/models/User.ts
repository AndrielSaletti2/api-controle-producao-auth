import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database'; 

class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  
  public resetPasswordToken!: string | null;
  public resetPasswordExpires!: Date | null;
  // ---------------------------------------
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;