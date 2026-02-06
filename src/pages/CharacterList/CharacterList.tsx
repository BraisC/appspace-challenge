import { useState } from 'react';
import { useGetCharacters } from '@/hooks/useCharacters';
import { Container, Title, Grid, Loading, Error } from './CharacterList.styles';
import { CharacterCard } from './components/CharacterCard';
import { Pagination } from './components/Pagination';

export const CharacterList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetCharacters({ page });

  if (isLoading) {
    return <Loading>Loading characters...</Loading>;
  }

  if (error) {
    return <Error>Error loading characters</Error>;
  }

  const info = data?.characters?.info;
  const validData = data?.characters?.results?.filter((character) => character !== null);

  return (
    <Container>
      <Title>Rick and Morty Characters</Title>
      <Grid>
        {validData?.map((character) => (
          <CharacterCard key={character?.id} character={character} />
        ))}
      </Grid>
      <Pagination info={info} currentPage={page} setPage={setPage} />
    </Container>
  );
};
