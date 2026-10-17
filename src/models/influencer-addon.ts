import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface InfluencerAddonAttributes {
  id: number;
  influencerId: number;
  kind: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type InfluencerAddonPk = 'id'
export type InfluencerAddonId = InfluencerAddon[InfluencerAddonPk]
export type InfluencerAddonOptionalAttributes = 'id' | 'createdAt' | 'updatedAt'
export type InfluencerAddonCreationAttributes = Optional<InfluencerAddonAttributes, InfluencerAddonOptionalAttributes>

export class InfluencerAddon extends Model<InfluencerAddonAttributes, InfluencerAddonCreationAttributes> implements InfluencerAddonAttributes {
  id!: number
  influencerId!: number
  kind!: string
  price!: number
  createdAt!: Date
  updatedAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof InfluencerAddon {
    return InfluencerAddon.init({
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
      kind: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'InfluencerAddon',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'influencer_addon_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'influencer_addon_influencer_id',
          fields: [{ name: 'influencerId' }],
        },
      ],
    })
  }
}
