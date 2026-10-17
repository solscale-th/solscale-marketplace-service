import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface JobAddonAttributes {
  id: number;
  jobId: number;
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type JobAddonPk = 'id'
export type JobAddonId = JobAddon[JobAddonPk]
export type JobAddonOptionalAttributes = 'id' | 'createdAt' | 'updatedAt'
export type JobAddonCreationAttributes = Optional<JobAddonAttributes, JobAddonOptionalAttributes>

export class JobAddon extends Model<JobAddonAttributes, JobAddonCreationAttributes> implements JobAddonAttributes {
  id!: number
  jobId!: number
  name!: string
  price!: number
  createdAt!: Date
  updatedAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof JobAddon {
    return JobAddon.init({
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
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      tableName: 'JobAddon',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'job_addon_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'job_addon_job_id',
          fields: [{ name: 'jobId' }],
        },
      ],
    })
  }
}
