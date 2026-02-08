import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: #666;
  font-size: 0.9rem;
`;

export const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #97ce4c;
    box-shadow: 0 0 0 2px rgba(0, 176, 200, 0.2);
  }
`;
