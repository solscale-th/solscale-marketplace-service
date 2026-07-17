import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface EngagementAttributes {
  id: number;
  applicationId: number;
  jobId: number;
  influencerId: number;
  workStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type EngagementPk = 'id'
export type EngagementId = Engagement[EngagementPk]
export type EngagementOptionalAttributes = 'id' | 'workStatus' | 'createdAt' | 'updatedAt'
export type EngagementCreationAttributes = Optional<EngagementAttributes, EngagementOptionalAttributes>

export class Engagement extends Model<EngagementAttributes, EngagementCreationAttributes> implements EngagementAttributes {
  id!: number
  applicationId!: number
  jobId!: number
  influencerId!: number
  workStatus!: string
  createdAt!: Date
  updatedAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof Engagement {
    return Engagement.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      influencerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      workStatus: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'not_submitted',
      },
    }, {
      sequelize,
      tableName: 'Engagement',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'engagement_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'engagement_application_id_key',
          unique: true,
          fields: [{ name: 'applicationId' }],
        },
      ],
    })
  }
}
