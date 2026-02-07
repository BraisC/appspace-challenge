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

type CharacterCardProps = Pick<Character, 'id' | 'name' | 'image' | 'species'>;

export const CharacterCard = ({ character }: { character: CharacterCardProps }) => {
  return (
    <CardLink to={`/character/${character.id}`}>
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
