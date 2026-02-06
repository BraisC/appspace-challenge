import { GraphQLClient } from 'graphql-request';

export const graphqlClient = new GraphQLClient('https://rickandmortyapi.com/graphql');

export const fetcher = <TData, TVariables extends Record<string, unknown>>(
  query: string,
  variables?: TVariables
) => {
  return async (): Promise<TData> => {
    return graphqlClient.request<TData>(query, variables);
  };
};
