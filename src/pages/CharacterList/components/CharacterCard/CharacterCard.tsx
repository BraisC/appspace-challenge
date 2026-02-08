import type { Character } from '@/types/graphql';
import {
  CardLink,
  Card,
  ImageWrapper,
  Image,
  Content,
  Name,
  Species,
} from './CharacterCard.styles';
import { useQueryClient } from '@tanstack/react-query';
import { graphqlClient } from '@/lib/graphql-client';
import { GetCharacterDocument } from '@/graphql/GetCharacters';

type CharacterCardProps = Pick<Character, 'id' | 'name' | 'image' | 'species'>;

export const CharacterCard = ({ character }: { character: CharacterCardProps }) => {
  const queryClient = useQueryClient();

  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ['GetCharacter', { id: character.id }],
      queryFn: () => graphqlClient.request(GetCharacterDocument, { id: character.id }),
    });
  };

  return (
    <CardLink to={`/character/${character.id}`} onMouseEnter={handleMouseEnter}>
      <Card>
        <ImageWrapper>
          <Image src={character.image ?? '/character-placeholder.jpg'} alt={character.name ?? ''} />
        </ImageWrapper>
        <Content>
          <Name>{character.name}</Name>
          <Species>{character.species}</Species>
        </Content>
      </Card>
    </CardLink>
  );
};
