export const GetCharactersDocument = /* GraphQL */ `
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        pages
        next
        prev
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

export const GetCharacterDocument = /* GraphQL */ `
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      image
      species
      gender
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        episode
        name
      }
    }
  }
`;
