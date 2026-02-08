import { useState, useMemo } from 'react';
import { useGetCharacters } from '@/hooks/useCharacters';
import { useDebounce } from '@/hooks/useDebounce';
import { Controls, Grid } from './CharacterList.styles';
import { CharacterCard } from './components/CharacterCard';
import { Pagination } from './components/Pagination';
import { SortControls } from './components/SortControls';
import type { SortOption } from './components/SortControls';
import { FilterControls } from './components/FilterControls';
import type { FilterValues } from './components/FilterControls';
import { Empty, Error } from '@/styles/shared.styles';
import { Loader } from '@/components/Loader';

export const CharacterList = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>('none');
  const [filters, setFilters] = useState<FilterValues>({ name: '', species: '' });
  const debouncedFilters = useDebounce(filters, 400);

  const { data, isLoading, error } = useGetCharacters({
    page,
    filter: {
      name: debouncedFilters.name || undefined,
      species: debouncedFilters.species || undefined,
    },
  });

  const info = data?.characters?.info;
  const validData = data?.characters?.results?.filter((character) => character !== null);

  // The problem with this API is that, as it can't get sorting as a query parameter, I can only sort on a page level, not globally :/
  // Also when order by species, in case of the same species they will be ordered by ID
  const sortedData = useMemo(() => {
    if (!validData || sortBy === 'none') return validData;

    return [...validData].sort((a, b) => {
      const aValue = a?.[sortBy] ?? '';
      const bValue = b?.[sortBy] ?? '';
      return aValue.localeCompare(bValue);
    });
  }, [validData, sortBy]);

  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (error) return <Error>Error loading</Error>;
    if (!sortedData?.length) return <Empty>No characters found</Empty>;

    return (
      <Grid>
        {sortedData.map((character) => (
          <CharacterCard key={character?.id} character={character} />
        ))}
      </Grid>
    );
  };

  return (
    <>
      <Controls>
        <SortControls value={sortBy} onChange={setSortBy} />
        <FilterControls
          values={filters}
          onChange={(newFilters) => {
            setFilters(newFilters);
            setPage(1);
          }}
        />
      </Controls>
      {renderContent()}
      <Pagination info={info} currentPage={page} onChange={setPage} />
    </>
  );
};
