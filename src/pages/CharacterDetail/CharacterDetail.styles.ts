import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #666;
  text-decoration: none;

  &:hover {
    color: #333;
  }
`;

export const Card = styled.div`
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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
  color: #333;

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
    $status === 'Alive' ? '#c3e6cb' : $status === 'Dead' ? '#f5c6cb' : '#e2e3e5'};
  color: ${({ $status }) =>
    $status === 'Alive' ? '#155724' : $status === 'Dead' ? '#721c24' : '#383d41'};
`;

export const Detail = styled.p`
  margin: 0.5rem 0;
  color: #666;

  strong {
    color: #333;
  }
`;

export const EpisodeSection = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid #eee;
`;

export const EpisodeTitle = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.2rem;
  color: #333;
`;
