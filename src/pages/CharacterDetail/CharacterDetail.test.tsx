import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, afterAll, beforeAll } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { CharacterDetail } from './CharacterDetail';

const mockCharacter = {
  id: '1',
  name: 'Rick Sanchez',
};

const server = setupServer(
  graphql.query('GetCharacter', () => {
    return HttpResponse.json({
      data: { character: mockCharacter },
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

const RenderWithQueryClientAndRouter = (id: string) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/character/${id}`]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('CharacterDetail', () => {
  it('displays character name', async () => {
    RenderWithQueryClientAndRouter('1');

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Rick Sanchez' })).toBeInTheDocument();
    });
  });
});
