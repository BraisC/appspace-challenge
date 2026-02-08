import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1.5rem;
  color: var(--color-teal);
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--color-lime);
  }
`;

export const Card = styled.div`
  border-radius: 12px;
  border: 2px solid var(--color-lime);
  box-shadow: 0 4px 20px var(--color-lime-glow);
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 600px) {
    width: 150px;
    height: 150px;
  }
`;

export const Info = styled.div`
  flex: 1;
`;

export const Name = styled.h1`
  margin: 0 0 1rem;
  font-size: 2rem;
  color: var(--color-text);

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

export const Status = styled.span<{ $status?: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  background: ${({ $status }) =>
    $status === 'Alive' ? 'var(--color-lime-light)' : $status === 'Dead' ? '#f5c6cb' : '#e2e3e5'};
  color: ${({ $status }) =>
    $status === 'Alive' ? '#5a8a2e' : $status === 'Dead' ? '#721c24' : '#383d41'};
  border: 1px solid
    ${({ $status }) =>
      $status === 'Alive' ? 'var(--color-lime)' : $status === 'Dead' ? '#f5c6cb' : '#e2e3e5'};
`;

export const Detail = styled.p`
  margin: 0.5rem 0;
  color: var(--color-text-muted);

  strong {
    color: var(--color-text);
  }
`;

export const EpisodeSection = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--color-border);
`;

export const EpisodeTitle = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: var(--color-text);
`;

export const EpisodeList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
`;

export const EpisodeItem = styled.li`
  padding: 0.5rem 0;
  border-radius: 4px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background: var(--color-lime-light);
  }

  &:last-child {
    border-bottom: none;
  }
`;
