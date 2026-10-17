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
  visibility: string;
  influencerId?: number;
  postingDate?: string;
  languages?: string[];
  caption?: string;
  requiredMessage?: string;
  forbiddenMessage?: string;
  packageName?: string;
  packageDetail?: string;
  packagePrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export type JobPk = 'id'
export type JobId = Job[JobPk]
export type JobOptionalAttributes = 'id' | 'brief' | 'deliverables' | 'requirements' | 'tags' | 'location' | 'duration' | 'budgetMin' | 'budgetMax' | 'startAt' | 'endAt' | 'status' | 'promoted' | 'visibility' | 'influencerId' | 'postingDate' | 'languages' | 'caption' | 'requiredMessage' | 'forbiddenMessage' | 'packageName' | 'packageDetail' | 'packagePrice' | 'createdAt' | 'updatedAt'
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
  visibility!: string
  influencerId?: number
  postingDate?: string
  languages?: string[]
  caption?: string
  requiredMessage?: string
  forbiddenMessage?: string
  packageName?: string
  packageDetail?: string
  packagePrice?: number
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
      visibility: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'public',
      },
      influencerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      postingDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      languages: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      caption: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      requiredMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      forbiddenMessage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      packageName: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      packageDetail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      packagePrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
