import { useQuery } from '@tanstack/react-query';
import { graphqlClient } from '../lib/graphql-client';
import type {
  GetCharactersQuery,
  GetCharactersQueryVariables,
  GetCharacterQuery,
  GetCharacterQueryVariables,
} from '../types/graphql';

const GetCharactersDocument = /* GraphQL */ `
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
      }
      results {
        id
        name
        image
        species
        location {
          name
        }
        episode {
          episode
          name
        }
      }
    }
  }
`;

const GetCharacterDocument = /* GraphQL */ `
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
