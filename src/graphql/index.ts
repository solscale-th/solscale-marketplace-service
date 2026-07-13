import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'
import path from 'path'

import { dateScalar, dateTimeScalar, timeScalar } from './custom-scalar'

const typeDefs = loadFilesSync(path.join(__dirname, './**/schema.graphql'))
const queries = loadFilesSync(path.join(__dirname, './**/query.*'))
const mutations = loadFilesSync(path.join(__dirname, './**/mutation.*'))

export default makeExecutableSchema({
  typeDefs: mergeTypeDefs([
    ...typeDefs,
  ]),
  resolvers: mergeResolvers([
    ...queries,
    ...mutations,
    {
      Date: dateScalar,
      DateTime: dateTimeScalar,
      Time: timeScalar
    },
  ]),
})
