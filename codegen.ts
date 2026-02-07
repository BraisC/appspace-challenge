import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://rickandmortyapi.com/graphql',
  documents: ['src/**/*.ts', 'src/**/*.tsx'],
  generates: {
    './src/types/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
