import { useParams } from 'react-router-dom';
import { useGetCharacter } from '@/hooks/useCharacters';

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetCharacter({ id: id! });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading character</div>;

  const character = data?.character;

  return (
    <div>
      <h1>{character?.name}</h1>
    </div>
  );
};
