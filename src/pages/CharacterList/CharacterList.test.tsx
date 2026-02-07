import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, afterAll, beforeAll } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { CharacterList } from './CharacterList';

const mockCharacters = [
  { id: '1', name: 'Rick Sanchez', image: 'rick.png', species: 'Human' },
  { id: '2', name: 'Morty Smith', image: 'morty.png', species: 'Human' },
  { id: '3', name: 'Birdperson', image: 'bird.png', species: 'Alien' },
  { id: '4', name: 'Albert Einstein', image: 'albert.png', species: 'Human' },
];

const server = setupServer(
  graphql.query('GetCharacters', () => {
    return HttpResponse.json({
      data: {
        characters: {
          info: { pages: 2, next: 2, prev: null },
          results: mockCharacters,
        },
      },
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  cleanup();
  server.resetHandlers();
});
afterAll(() => server.close());

const renderWithQueryClientAndRouter = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe('CharacterList', () => {
  it('shows loading state then renders characters', async () => {
    renderWithQueryClientAndRouter(<CharacterList />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    expect(screen.getByText('Birdperson')).toBeInTheDocument();
  });

  it('shows error state when API fails', async () => {
    server.use(
      graphql.query('GetCharacters', () => {
        return HttpResponse.json({
          errors: [{ message: 'Something went wrong' }],
        });
      })
    );

    renderWithQueryClientAndRouter(<CharacterList />);

    await waitFor(() => {
      expect(screen.getByText('Error loading')).toBeInTheDocument();
    });
  });

  it('sorts characters by name', async () => {
    renderWithQueryClientAndRouter(<CharacterList />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'name' } });

    const names = screen.getAllByRole('heading', { level: 3 });
    expect(names[0]).toHaveTextContent('Albert Einstein');
    expect(names[1]).toHaveTextContent('Birdperson');
    expect(names[2]).toHaveTextContent('Morty Smith');
    expect(names[3]).toHaveTextContent('Rick Sanchez');
  });

  it('sorts characters by species', async () => {
    renderWithQueryClientAndRouter(<CharacterList />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'species' } });

    // It is expected to show them ordered by species and by ID if same species
    const names = screen.getAllByRole('heading', { level: 3 });
    expect(names[0]).toHaveTextContent('Birdperson');
    expect(names[1]).toHaveTextContent('Rick Sanchez');
    expect(names[2]).toHaveTextContent('Morty Smith');
    expect(names[3]).toHaveTextContent('Albert Einstein');
  });

  it('filters by name', async () => {
    server.use(
      graphql.query('GetCharacters', ({ variables }) => {
        const filtered = mockCharacters.filter((c) =>
          c.name.toLowerCase().includes(variables.filter?.name?.toLowerCase() ?? '')
        );
        return HttpResponse.json({
          data: {
            characters: {
              info: { pages: 1, next: null, prev: null },
              results: filtered,
            },
          },
        });
      })
    );

    renderWithQueryClientAndRouter(<CharacterList />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const nameInput = screen.getByPlaceholderText('Filter by name...');
    fireEvent.change(nameInput, { target: { value: 'Rick' } });

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.queryByText('Morty Smith')).not.toBeInTheDocument();
    });
  });
});
