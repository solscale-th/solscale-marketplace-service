import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface InfluencerReviewAttributes {
  id: number;
  influencerId: number;
  entrepreneurId: number;
  engagementId?: number;
  rating: number;
  comment?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type InfluencerReviewPk = 'id'
export type InfluencerReviewId = InfluencerReview[InfluencerReviewPk]
export type InfluencerReviewOptionalAttributes = 'id' | 'engagementId' | 'comment' | 'createdAt' | 'updatedAt'
export type InfluencerReviewCreationAttributes = Optional<InfluencerReviewAttributes, InfluencerReviewOptionalAttributes>

export class InfluencerReview extends Model<InfluencerReviewAttributes, InfluencerReviewCreationAttributes> implements InfluencerReviewAttributes {
  id!: number
  influencerId!: number
  entrepreneurId!: number
  engagementId?: number
  rating!: number
  comment?: string
  createdAt!: Date
  updatedAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof InfluencerReview {
    return InfluencerReview.init({
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
      entrepreneurId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      engagementId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    }, {
      sequelize,
      tableName: 'InfluencerReview',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'influencer_review_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'influencer_review_influencer_id',
          fields: [{ name: 'influencerId' }],
        },
      ],
    })
  }
}
