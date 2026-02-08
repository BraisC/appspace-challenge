import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem;
`;

export const Image = styled.img`
  width: 30rem;
  height: 30rem;
  animation: ${spin} 3s linear infinite;

  @media (max-width: 600px) {
    width: 18rem;
    height: 18rem;
  }
`;
