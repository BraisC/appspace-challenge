// import { useState } from 'react';
import { useGetCharacters } from './hooks/useCharacters';

function App() {
  const { data, isLoading } = useGetCharacters({ page: 1 });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div>
        {data?.characters?.results?.map((character) => (
          <div key={character?.id}>
            <h2>{character?.name}</h2>
            <p>{character?.status}</p>
            <p>{character?.species}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
