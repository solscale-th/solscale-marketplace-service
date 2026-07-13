import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'
import tseslint, { parser } from 'typescript-eslint'

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ['dist/*', 'src/generated/*', 'src/migrations/*'] },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
      parserOptions: {
        parser: parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      '@stylistic': stylistic,
      'import-sort': simpleImportSort,
      'unused-imports': unusedImports,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-spacing': ['error', { 'before': false, 'after': true }],
      '@stylistic/function-call-spacing': ['error', 'never'],
      '@stylistic/key-spacing': ['error', {
        'mode': 'strict',
        'beforeColon': false,
        'afterColon': true,
      }],
      '@stylistic/keyword-spacing': ['error', { 'before': true, 'after': true }],
      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/switch-colon-spacing': ['error', { 'before': true, 'after': false }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': 'off',
      'import-sort/imports': 'error',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          'vars': 'all',
          'varsIgnorePattern': '^_',
          'args': 'after-used',
          'argsIgnorePattern': '^_',
        },
      ],
    },
  },
)
