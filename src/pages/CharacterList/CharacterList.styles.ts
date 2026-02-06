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
  grid-template-columns: repeat(auto-fill, 220px);
  gap: 2rem;
  justify-content: space-evenly;
  padding: 0 2rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(auto-fill, 190px);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, 140px);
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
