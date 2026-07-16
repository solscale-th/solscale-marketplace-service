import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface InfluencerAttributes {
  id: number;
  email: string;
  password: string | null;
  googleId?: string | null;
  firstName: string;
  lastName: string;
  stageName?: string;
  age?: number;
  avatarUrl?: string;
  platforms?: string[];
  contentCategories?: string[];
  languages?: string[];
  bankName?: string;
  bankAccountName?: string;
  bankAccountNumber?: string;
  otherPhotos?: string[];
  averageRating: number;
  reviewCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type InfluencerPk = 'id'
export type InfluencerId = Influencer[InfluencerPk]
export type InfluencerOptionalAttributes = 'id' | 'password' | 'googleId' | 'stageName' | 'age' | 'avatarUrl' | 'platforms' | 'contentCategories' | 'languages' | 'bankName' | 'bankAccountName' | 'bankAccountNumber' | 'otherPhotos' | 'averageRating' | 'reviewCount' | 'createdAt' | 'updatedAt'
export type InfluencerCreationAttributes = Optional<InfluencerAttributes, InfluencerOptionalAttributes>

export class Influencer extends Model<InfluencerAttributes, InfluencerCreationAttributes> implements InfluencerAttributes {
  id!: number
  email!: string
  password!: string | null
  googleId?: string | null
  firstName!: string
  lastName!: string
  stageName?: string
  age?: number
  avatarUrl?: string
  platforms?: string[]
  contentCategories?: string[]
  languages?: string[]
  bankName?: string
  bankAccountName?: string
  bankAccountNumber?: string
  otherPhotos?: string[]
  averageRating!: number
  reviewCount!: number
  createdAt!: Date
  updatedAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof Influencer {
    return Influencer.init({
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
        allowNull: true,
      },
      googleId: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: true,
      },
      firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      stageName: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      avatarUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      platforms: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      contentCategories: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      languages: {
        type: DataTypes.JSONB,
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
      otherPhotos: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      averageRating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
        defaultValue: 0,
      },
      reviewCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    }, {
      sequelize,
      tableName: 'Influencer',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'influencer_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'influencer_email_key',
          unique: true,
          fields: [{ name: 'email' }],
        },
        {
          name: 'influencer_google_id_key',
          unique: true,
          fields: [{ name: 'googleId' }],
        },
      ],
    })
  }
}
