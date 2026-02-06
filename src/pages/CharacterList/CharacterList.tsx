import { useGetCharacters } from '@/hooks/useCharacters';
import { Container, Title, Grid, Loading, Error } from './CharacterList.styles';
import { CharacterCard } from './components/CharacterCard';

export const CharacterList = () => {
  const { data, isLoading, error } = useGetCharacters({ page: 1 });

  if (isLoading) {
    return <Loading>Loading characters...</Loading>;
  }

  if (error) {
    return <Error>Error loading characters</Error>;
  }

  const validData = data?.characters?.results?.filter((character) => character !== null);

  return (
    <Container>
      <Title>Rick and Morty Characters</Title>
      <Grid>
        {validData?.map((character) => (
          <CharacterCard key={character?.id} character={character} />
        ))}
      </Grid>
    </Container>
  );
};
