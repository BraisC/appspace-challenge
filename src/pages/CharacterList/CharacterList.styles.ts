import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
  font-family: 'Courier New', Courier, monospace;
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 25rem);
  justify-content: space-evenly;
  gap: 4rem 2rem;
  padding: 0px 2rem;
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
