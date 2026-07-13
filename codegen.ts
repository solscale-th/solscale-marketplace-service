
import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/graphql/**/schema.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        scalars: {
          Date: {
            input: 'string',
            output: 'string',
          },
          Time: {
            input: 'string',
            output: 'string',
          }
        }
      }
    }
  }
}

export default config
