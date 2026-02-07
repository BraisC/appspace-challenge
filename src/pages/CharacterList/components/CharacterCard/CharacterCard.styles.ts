import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  width: 16rem;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 900px) {
    width: 12rem;
  }

  @media (max-width: 600px) {
    width: 9rem;
  }
`;

export const ImageWrapper = styled.div`
  aspect-ratio: 1;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Content = styled.div`
  padding: 1rem;

  @media (max-width: 600px) {
    padding: 0.75rem;
  }
`;

export const Name = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

export const Species = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
