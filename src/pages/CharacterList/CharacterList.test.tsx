import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, afterEach, afterAll, beforeAll } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { CharacterList } from './CharacterList';

const mockCharacters = [
  { id: '1', name: 'Rick Sanchez', image: 'rick.png', species: 'Human' },
  { id: '2', name: 'Morty Smith', image: 'morty.png', species: 'Human' },
  { id: '3', name: 'Birdperson', image: 'bird.png', species: 'Alien' },
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

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe('CharacterList', () => {
  it('shows loading state then renders characters', async () => {
    renderWithQueryClient(<CharacterList />);

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

    renderWithQueryClient(<CharacterList />);

    await waitFor(() => {
      expect(screen.getByText('Error loading')).toBeInTheDocument();
    });
  });

  it('sorts characters by name', async () => {
    renderWithQueryClient(<CharacterList />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'name' } });

    const names = screen.getAllByRole('heading', { level: 3 });
    expect(names[0]).toHaveTextContent('Birdperson');
    expect(names[1]).toHaveTextContent('Morty Smith');
    expect(names[2]).toHaveTextContent('Rick Sanchez');
  });

  it('sorts characters by species', async () => {
    renderWithQueryClient(<CharacterList />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'species' } });

    const names = screen.getAllByRole('heading', { level: 3 });
    expect(names[0]).toHaveTextContent('Birdperson');
    expect(names[1]).toHaveTextContent('Rick Sanchez');
    expect(names[2]).toHaveTextContent('Morty Smith');
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

    renderWithQueryClient(<CharacterList />);

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
