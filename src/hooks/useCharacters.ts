import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql-client';
import type {
  GetCharactersQuery,
  GetCharactersQueryVariables,
  GetCharacterQuery,
  GetCharacterQueryVariables,
} from '../types/graphql';
import { GetCharacterDocument, GetCharactersDocument } from '@/graphql/GetCharacters';

export function useGetCharacters(variables?: GetCharactersQueryVariables) {
  return useQuery({
    queryKey: ['GetCharacters', variables],
    queryFn: () => graphqlClient.request<GetCharactersQuery>(GetCharactersDocument, variables),
  });
}

export function useGetCharacter(variables: GetCharacterQueryVariables) {
  return useQuery({
    queryKey: ['GetCharacter', variables],
    queryFn: () => graphqlClient.request<GetCharacterQuery>(GetCharacterDocument, variables),
  });
}
