import * as Types from '../types/graphql-types';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetcher } from '../lib/graphql-client';


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
      variables?: Types.GetCharactersQueryVariables,
      options?: Omit<UseQueryOptions<Types.GetCharactersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Types.GetCharactersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Types.GetCharactersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['GetCharacters'] : ['GetCharacters', variables],
    queryFn: fetcher<Types.GetCharactersQuery, Types.GetCharactersQueryVariables>(GetCharactersDocument, variables),
    ...options
  }
    )};

useGetCharactersQuery.getKey = (variables?: Types.GetCharactersQueryVariables) => variables === undefined ? ['GetCharacters'] : ['GetCharacters', variables];


useGetCharactersQuery.fetcher = (variables?: Types.GetCharactersQueryVariables, options?: RequestInit['headers']) => fetcher<Types.GetCharactersQuery, Types.GetCharactersQueryVariables>(GetCharactersDocument, variables, options);

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
      variables: Types.GetCharacterQueryVariables,
      options?: Omit<UseQueryOptions<Types.GetCharacterQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<Types.GetCharacterQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<Types.GetCharacterQuery, TError, TData>(
      {
    queryKey: ['GetCharacter', variables],
    queryFn: fetcher<Types.GetCharacterQuery, Types.GetCharacterQueryVariables>(GetCharacterDocument, variables),
    ...options
  }
    )};

useGetCharacterQuery.getKey = (variables: Types.GetCharacterQueryVariables) => ['GetCharacter', variables];


useGetCharacterQuery.fetcher = (variables: Types.GetCharacterQueryVariables, options?: RequestInit['headers']) => fetcher<Types.GetCharacterQuery, Types.GetCharacterQueryVariables>(GetCharacterDocument, variables, options);
