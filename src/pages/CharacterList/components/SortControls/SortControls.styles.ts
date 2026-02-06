import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const Label = styled.span`
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
    border-color: #333;
  }
`;
