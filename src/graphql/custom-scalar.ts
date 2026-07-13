import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'
import moment from 'moment'

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'General Date type',
  serialize: (value) => {
    if (value instanceof Date) {
      return value.toISOString()
    }
    if (typeof value === 'string' || typeof value === 'number') {
      const parsedDate = moment(value)
      if (parsedDate.isValid()) {
        return parsedDate.format('YYYY-MM-DD')
      }
    }
    throw new GraphQLError('GraphQL Scalar Type Error - Expected Date Type', {
      extensions: {
        code: 'INVALID_TYPE',
        http: { code: 400 },
      },
    })
  },
  parseValue: (value) => {
    if (typeof value === 'string' || typeof value === 'number') {
      const date = moment(value)
      if (date.isValid()) {
        return date.format('YYYY-MM-DD')
      }
    }
    throw new GraphQLError('GraphQL Scalar Type Error - Expected Date format String', {
      extensions: {
        code: 'INVALID_TYPE',
        http: { code: 400 },
      },
    })
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      const date = moment(ast.value)
      if (date.isValid()) {
        return date.format('YYYY-MM-DD')
      }
    }
    throw new GraphQLError('GraphQL Scalar Type Error - Expected Date format String or Number as Literal', {
      extensions: {
        code: 'INVALID_TYPE',
        http: { code: 400 },
      },
    })
  }
})

export const dateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'General DateTime type',
  serialize: (value) => {
    if (value instanceof Date) {
      return value
    }
    if (typeof value === 'string' || typeof value === 'number') {
      const parsedDate = moment(value)
      if (parsedDate.isValid()) {
        return parsedDate.toDate()
      }
    }
    throw new GraphQLError('GraphQL Scalar Type Error - Expected DateTime Type', {
      extensions: {
        code: 'INVALID_TYPE',
        http: { code: 400 },
      },
    })
  },
  parseValue: (value) => {
    if (typeof value === 'string' || typeof value === 'number') {
      const date = moment(value)
      if (date.isValid()) {
        return date.toDate()
      }
    }
    throw new GraphQLError('GraphQL Scalar Type Error - Expected DateTime format String', {
      extensions: {
        code: 'INVALID_TYPE',
        http: { code: 400 },
      },
    })
  },
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT || ast.kind === Kind.STRING) {
      const date = moment(ast.value)
      if (date.isValid()) {
        return date.toDate()
      }
    }
    throw new GraphQLError('GraphQL Scalar Type Error - Expected DateTime format String or Number as Literal', {
      extensions: {
        code: 'INVALID_TYPE',
        http: { code: 400 },
      },
    })
  }
})

export const timeScalar = new GraphQLScalarType({
  name: 'Time',
  description: 'Custom scalar for time in HH:mm:ss format',

  serialize: (value) => {
    if (typeof value !== 'string' || !TIME_REGEX.test(value)) {
      throw new Error('Serialize: Time must be a string in HH:mm:ss format')
    }
    return value
  },

  parseValue: (value) => {
    if (typeof value !== 'string' || !TIME_REGEX.test(value)) {
      throw new Error('ParseValue: Invalid time format, expected HH:mm:ss')
    }
    return value
  },

  parseLiteral: (ast) => {
    if (ast.kind !== Kind.STRING || !TIME_REGEX.test(ast.value)) {
      throw new Error('ParseLiteral: Invalid time format, expected HH:mm:ss')
    }
    return ast.value
  }
})
