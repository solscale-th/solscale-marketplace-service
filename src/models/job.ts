import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface JobAttributes {
  id: number;
  entrepreneurId: number;
  title: string;
  description: string;
  brief?: string;
  platform: string;
  deliverables?: string[];
  requirements?: string[];
  tags?: string[];
  location?: string;
  duration?: string;
  budgetMin?: number;
  budgetMax?: number;
  startAt?: Date;
  endAt?: Date;
  status: string;
  promoted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type JobPk = 'id'
export type JobId = Job[JobPk]
export type JobOptionalAttributes = 'id' | 'brief' | 'deliverables' | 'requirements' | 'tags' | 'location' | 'duration' | 'budgetMin' | 'budgetMax' | 'startAt' | 'endAt' | 'status' | 'promoted' | 'createdAt' | 'updatedAt'
export type JobCreationAttributes = Optional<JobAttributes, JobOptionalAttributes>

export class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  id!: number
  entrepreneurId!: number
  title!: string
  description!: string
  brief?: string
  platform!: string
  deliverables?: string[]
  requirements?: string[]
  tags?: string[]
  location?: string
  duration?: string
  budgetMin?: number
  budgetMax?: number
  startAt?: Date
  endAt?: Date
  status!: string
  promoted!: boolean
  createdAt!: Date
  updatedAt!: Date

  static initModel(sequelize: Sequelize.Sequelize): typeof Job {
    return Job.init({
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      entrepreneurId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      brief: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      platform: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      deliverables: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      requirements: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      tags: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      location: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      duration: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      budgetMin: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      budgetMax: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      startAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      endAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'open',
      },
      promoted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    }, {
      sequelize,
      tableName: 'Job',
      schema: 'public',
      timestamps: true,
      indexes: [
        {
          name: 'job_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'job_entrepreneur_id',
          fields: [{ name: 'entrepreneurId' }],
        },
      ],
    })
  }
}
