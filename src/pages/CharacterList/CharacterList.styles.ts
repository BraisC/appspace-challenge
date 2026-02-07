import styled from 'styled-components';

export const Controls = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
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
