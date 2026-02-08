import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: var(--color-text-muted);
  font-size: 0.9rem;
`;

export const Select = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-disabled);
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.9rem;
  cursor: pointer;
  background: #fff;

  &:focus {
    outline: none;
    border-color: var(--color-lime);
    box-shadow: 0 0 0 2px var(--color-lime-light);
  }
`;
