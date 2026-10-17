import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface InfluencerPackageAttributes {
  id: number;
  influencerId: number;
  tier: string;
  platform?: string;
  price: number;
  includes?: string[];
  revisions: number;
  turnaroundDays: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type InfluencerPackagePk = 'id'
export type InfluencerPackageId = InfluencerPackage[InfluencerPackagePk]
export type InfluencerPackageOptionalAttributes = 'id' | 'platform' | 'includes' | 'revisions' | 'turnaroundDays' | 'createdAt' | 'updatedAt'
export type InfluencerPackageCreationAttributes = Optional<InfluencerPackageAttributes, InfluencerPackageOptionalAttributes>

export class InfluencerPackage extends Model<InfluencerPackageAttributes, InfluencerPackageCreationAttributes> implements InfluencerPackageAttributes {
  id!: number
  influencerId!: number
  tier!: string
  platform?: string
  price!: number
  includes?: string[]
  revisions!: number
  turnaroundDays!: number
  createdAt!: Date
  updatedAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof InfluencerPackage {
    return InfluencerPackage.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      influencerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tier: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      platform: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      includes: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      revisions: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      turnaroundDays: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    }, {
      sequelize,
      tableName: 'InfluencerPackage',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'influencer_package_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'influencer_package_influencer_id',
          fields: [{ name: 'influencerId' }],
        },
      ],
    })
  }
}
