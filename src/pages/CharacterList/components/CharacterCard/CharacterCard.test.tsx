import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { CharacterCard } from './CharacterCard';

afterEach(cleanup);

describe('CharacterCard', () => {
  const character = {
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://example.com/rick.png',
    species: 'Human',
  };

  it('renders character name', () => {
    render(<CharacterCard character={character} />);
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });

  it('renders character species', () => {
    render(<CharacterCard character={character} />);
    expect(screen.getByText('Human')).toBeInTheDocument();
  });

  it('renders character image with correct src and alt', () => {
    render(<CharacterCard character={character} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/rick.png');
    expect(image).toHaveAttribute('alt', 'Rick Sanchez');
  });

  it('handles null name correctly', () => {
    render(<CharacterCard character={{ ...character, name: null }} />);
    const image = screen.getByRole('presentation');
    expect(image).toHaveAttribute('alt', '');
  });

  it('uses placeholder when image is null', () => {
    render(<CharacterCard character={{ ...character, image: null }} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/character-placeholder.jpg');
  });
});
