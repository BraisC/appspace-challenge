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
  image: 'https://example.com/rick.png',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth (C-137)' },
  location: { name: 'Citadel of Ricks' },
  episode: [
    { id: '1', episode: 'S01E01', name: 'Pilot' },
    { id: '2', episode: 'S01E02', name: 'Lawnmower Dog' },
  ],
};

const server = setupServer(
  graphql.query('GetCharacter', ({ variables }) => {
    if (variables.id !== '1') {
      return HttpResponse.json({
        errors: [{ message: 'Character not found' }],
      });
    }
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
  it('shows loading state', () => {
    RenderWithQueryClientAndRouter('1');
    expect(screen.getByAltText('Loading')).toBeInTheDocument();
  });

  it('shows error state when API fails', async () => {
    RenderWithQueryClientAndRouter('999');

    await waitFor(() => {
      expect(screen.getByText('Error loading character')).toBeInTheDocument();
    });
  });

  it('displays character name', async () => {
    RenderWithQueryClientAndRouter('1');

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Rick Sanchez' })).toBeInTheDocument();
    });
  });

  it('displays character image', async () => {
    RenderWithQueryClientAndRouter('1');

    await waitFor(() => {
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://example.com/rick.png');
      expect(image).toHaveAttribute('alt', 'Rick Sanchez');
    });
  });

  it('displays character status', async () => {
    RenderWithQueryClientAndRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Alive')).toBeInTheDocument();
    });
  });

  it('displays character species', async () => {
    RenderWithQueryClientAndRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Human')).toBeInTheDocument();
    });
  });

  it('displays character gender', async () => {
    RenderWithQueryClientAndRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Male')).toBeInTheDocument();
    });
  });

  it('displays character origin', async () => {
    RenderWithQueryClientAndRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
    });
  });

  it('displays character location', async () => {
    RenderWithQueryClientAndRouter('1');

    await waitFor(() => {
      expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
    });
  });

  it('displays episode list', async () => {
    RenderWithQueryClientAndRouter('1');

    await waitFor(() => {
      expect(screen.getByText('S01E01 - Pilot')).toBeInTheDocument();
      expect(screen.getByText('S01E02 - Lawnmower Dog')).toBeInTheDocument();
    });
  });

  it('has a link to return to home', async () => {
    RenderWithQueryClientAndRouter('1');

    await waitFor(() => {
      const link = screen.getByRole('link', { name: /go back/i });
      expect(link).toHaveAttribute('href', '/');
    });
  });
});
