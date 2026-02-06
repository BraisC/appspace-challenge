import * as Types from '../types/graphql-types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}


export const GetCharactersDocument = `
    query GetCharacters($page: Int) {
  characters(page: $page) {
    info {
      count
      pages
      next
      prev
    }
    results {
      id
      name
      status
      species
      image
    }
  }
}
    `;

export const useGetCharactersQuery = <
      TData = Types.GetCharactersQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables?: Types.GetCharactersQueryVariables,
      options?: Omit<UseQueryOptions<Types.GetCharactersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Types.GetCharactersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Types.GetCharactersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetCharacters'] : ['GetCharacters', variables],
    queryFn: fetcher<Types.GetCharactersQuery, Types.GetCharactersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCharactersDocument, variables),
    ...options
  }
    )};

useGetCharactersQuery.getKey = (variables?: Types.GetCharactersQueryVariables) => variables === undefined ? ['GetCharacters'] : ['GetCharacters', variables];


useGetCharactersQuery.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables?: Types.GetCharactersQueryVariables) => fetcher<Types.GetCharactersQuery, Types.GetCharactersQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCharactersDocument, variables);

export const GetCharacterDocument = `
    query GetCharacter($id: ID!) {
  character(id: $id) {
    id
    name
    status
    species
    type
    gender
    origin {
      name
    }
    location {
      name
    }
    image
    episode {
      id
      name
      air_date
    }
  }
}
    `;

export const useGetCharacterQuery = <
      TData = Types.GetCharacterQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit },
      variables: Types.GetCharacterQueryVariables,
      options?: Omit<UseQueryOptions<Types.GetCharacterQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Types.GetCharacterQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Types.GetCharacterQuery, TError, TData>(
      {
    queryKey: ['GetCharacter', variables],
    queryFn: fetcher<Types.GetCharacterQuery, Types.GetCharacterQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCharacterDocument, variables),
    ...options
  }
    )};

useGetCharacterQuery.getKey = (variables: Types.GetCharacterQueryVariables) => ['GetCharacter', variables];


useGetCharacterQuery.fetcher = (dataSource: { endpoint: string, fetchParams?: RequestInit }, variables: Types.GetCharacterQueryVariables) => fetcher<Types.GetCharacterQuery, Types.GetCharacterQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, GetCharacterDocument, variables);
