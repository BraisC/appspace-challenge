import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://rickandmortyapi.com/graphql',
  documents: ['src/queries/*.graphql'],
  generates: {
    './src/types/graphql-types.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
    './src/hooks/queries.ts': {
      plugins: ['typescript-react-query'],
      preset: 'import-types',
      presetConfig: {
        typesPath: '../types/graphql-types',
      },
      config: {
        reactQueryVersion: 5,
        exposeQueryKeys: true,
        exposeFetcher: true,
      },
    },
  },
};

export default config;
