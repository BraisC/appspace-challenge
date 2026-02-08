import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const Input = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  width: 150px;

  &:focus {
    outline: none;
    border-color: #97ce4c;
    box-shadow: 0 0 0 2px rgba(0, 176, 200, 0.2);
  }

  &::placeholder {
    color: #999;
  }
`;
