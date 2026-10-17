import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface InfluencerPortfolioItemAttributes {
  id: number;
  influencerId: number;
  title: string;
  platform?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type InfluencerPortfolioItemPk = 'id'
export type InfluencerPortfolioItemId = InfluencerPortfolioItem[InfluencerPortfolioItemPk]
export type InfluencerPortfolioItemOptionalAttributes = 'id' | 'platform' | 'imageUrl' | 'createdAt' | 'updatedAt'
export type InfluencerPortfolioItemCreationAttributes = Optional<InfluencerPortfolioItemAttributes, InfluencerPortfolioItemOptionalAttributes>

export class InfluencerPortfolioItem extends Model<InfluencerPortfolioItemAttributes, InfluencerPortfolioItemCreationAttributes> implements InfluencerPortfolioItemAttributes {
  id!: number
  influencerId!: number
  title!: string
  platform?: string
  imageUrl?: string
  createdAt!: Date
  updatedAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof InfluencerPortfolioItem {
    return InfluencerPortfolioItem.init({
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
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      platform: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'InfluencerPortfolioItem',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'influencer_portfolio_item_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'influencer_portfolio_item_influencer_id',
          fields: [{ name: 'influencerId' }],
        },
      ],
    })
  }
}
