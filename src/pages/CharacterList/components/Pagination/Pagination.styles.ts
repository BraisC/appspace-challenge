import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export const PageButton = styled.button<{ disabled?: boolean }>`
  padding: 0.5rem 1rem;
  border: ${({ disabled }) => (disabled ? '2px solid var(--color-disabled)' : '2px solid var(--color-lime)')};
  border-radius: 4px;
  background: ${({ disabled }) => (disabled ? 'var(--color-disabled)' : 'var(--color-teal)')};
  color: ${({ disabled }) => (disabled ? 'var(--color-text-muted)' : 'var(--color-text)')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.2s;
  font-family: inherit;
  min-width: 6rem;

  &:hover:not(:disabled) {
    background: var(--color-lime);
  }
`;

export const PageInfo = styled.span`
  color: var(--color-text-muted);

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;
