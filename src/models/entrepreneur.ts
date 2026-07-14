import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface EntrepreneurAttributes {
  id: number;
  email: string;
  password: string;
  companyName: string;
  brandDescription?: string;
  logoUrl?: string;
  bankName?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EntrepreneurPk = 'id'
export type EntrepreneurId = Entrepreneur[EntrepreneurPk]
export type EntrepreneurOptionalAttributes = 'id' | 'brandDescription' | 'logoUrl' | 'bankName' | 'bankAccountName' | 'bankAccountNumber' | 'createdAt' | 'updatedAt'
export type EntrepreneurCreationAttributes = Optional<EntrepreneurAttributes, EntrepreneurOptionalAttributes>

export class Entrepreneur extends Model<EntrepreneurAttributes, EntrepreneurCreationAttributes> implements EntrepreneurAttributes {
  id!: number
  email!: string
  password!: string
  companyName!: string
  brandDescription?: string
  logoUrl?: string
  bankName?: string
  bankAccountName?: string
  bankAccountNumber?: string
  createdAt!: Date
  updatedAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof Entrepreneur {
    return Entrepreneur.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      companyName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      brandDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      logoUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bankName: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bankAccountName: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bankAccountNumber: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'Entrepreneur',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'entrepreneur_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'entrepreneur_email_key',
          unique: true,
          fields: [{ name: 'email' }],
        },
      ],
    })
  }
}
