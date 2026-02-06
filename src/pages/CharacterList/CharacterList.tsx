import { useState, useMemo } from 'react';
import { useGetCharacters } from '@/hooks/useCharacters';
import {
  Container,
  Title,
  Grid,
  Loading,
  Error,
  SortControls,
  SortLabel,
  SortSelect,
} from './CharacterList.styles';
import { CharacterCard } from './components/CharacterCard';
import { Pagination } from './components/Pagination';

type SortOption = 'none' | 'name' | 'species';

export const CharacterList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('none');
  const { data, isLoading, error } = useGetCharacters({ page });

  const info = data?.characters?.info;
  const validData = data?.characters?.results?.filter((character) => character !== null);

  //The problem with this API is that, as it can't get sorting as a query parameter, I can only sort on a page level, not globally :/
  const sortedData = useMemo(() => {
    if (!validData || sortBy === 'none') return validData;

    return [...validData].sort((a, b) => {
      const aValue = a?.[sortBy] ?? '';
      const bValue = b?.[sortBy] ?? '';
      return aValue.localeCompare(bValue);
    });
  }, [validData, sortBy]);

  if (isLoading) {
    return <Loading>Loading characters...</Loading>;
  }

  if (error) {
    return <Error>Error loading characters</Error>;
  }

  return (
    <Container>
      <Title>Rick and Morty Characters</Title>
      <SortControls>
        <SortLabel>Sort by:</SortLabel>
        <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)}>
          <option value="none">Default</option>
          <option value="name">Name</option>
          <option value="species">Species</option>
        </SortSelect>
      </SortControls>
      <Grid>
        {sortedData?.map((character) => (
          <CharacterCard key={character?.id} character={character} />
        ))}
      </Grid>
      <Pagination info={info} currentPage={page} setPage={setPage} />
    </Container>
  );
};
