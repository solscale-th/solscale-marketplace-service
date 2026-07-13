import dotenv from 'dotenv'

dotenv.config()

const sharedDbConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  logging: false,
  port: Number.parseInt(process.env.DB_PORT),
  dialect: 'postgres',
}

export default {
  development: {
    ...sharedDbConfig,
  },
  uat: {
    ...sharedDbConfig,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    ...sharedDbConfig,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
}
