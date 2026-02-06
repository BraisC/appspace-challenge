import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Courier New', Courier, monospace;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 16rem);
  gap: 2rem;
  justify-content: space-evenly;
  padding: 0 2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, 12rem);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, 9rem);
    gap: 1rem;
    padding: 0 1rem;
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

export const Error = styled.div`
  text-align: center;
  padding: 2rem;
  color: #f44336;
`;

export const SortControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const SortLabel = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

export const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #333;
  }
`;
