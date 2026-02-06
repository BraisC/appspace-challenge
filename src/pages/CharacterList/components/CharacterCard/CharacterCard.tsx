import type { Character } from '@/types/graphql';
import { Card } from './CharacterCard.styles';

type CharacterCardProps = Pick<Character, 'id' | 'name' | 'image' | 'species'>;

export const CharacterCard = ({ character }: { character: CharacterCardProps }) => {
  return <Card key={character?.id}>{character.name}</Card>;
};
