import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface ApplicationAttributes {
  id: number;
  jobId: number;
  influencerId: number;
  source: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ApplicationPk = 'id'
export type ApplicationId = Application[ApplicationPk]
export type ApplicationOptionalAttributes = 'id' | 'status' | 'createdAt' | 'updatedAt'
export type ApplicationCreationAttributes = Optional<ApplicationAttributes, ApplicationOptionalAttributes>

export class Application extends Model<ApplicationAttributes, ApplicationCreationAttributes> implements ApplicationAttributes {
  id!: number
  jobId!: number
  influencerId!: number
  source!: string
  status!: string
  createdAt!: Date
  updatedAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof Application {
    return Application.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      influencerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      source: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'pending',
      },
    }, {
      sequelize,
      tableName: 'Application',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'application_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'application_job_id_influencer_id_key',
          unique: true,
          fields: [{ name: 'jobId' }, { name: 'influencerId' }],
          where: { status: { [Sequelize.Op.in]: ['pending', 'accepted'] } },
        },
      ],
    })
  }
}
