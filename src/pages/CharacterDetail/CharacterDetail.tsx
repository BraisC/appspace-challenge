import { Link, useParams } from 'react-router-dom';
import { useGetCharacter } from '@/hooks/useCharacters';

export const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetCharacter({ id: id! });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading character</div>;

  const character = data?.character;

  return (
    <div>
      <Link to="/">Go back</Link>
      <h1>{character?.name}</h1>
      <img src={character?.image ?? ''} alt={character?.name ?? ''} />
      <p>{character?.status}</p>
      <p>{character?.species}</p>
      <p>{character?.gender}</p>
      <p>{character?.origin?.name}</p>
      <p>{character?.location?.name}</p>
      <ul>
        {character?.episode.map((ep) => (
          <li key={ep?.id}>{ep?.episode + ' - ' + ep?.name}</li>
        ))}
      </ul>
    </div>
  );
};
