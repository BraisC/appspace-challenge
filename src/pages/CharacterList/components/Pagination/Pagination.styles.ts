import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export const PageButton = styled.button<{ disabled?: boolean }>`
  padding: 0.5rem 1rem;
  border: ${({ disabled }) => (disabled ? '2px solid #ccc' : '2px solid #97ce4c')};
  border-radius: 4px;
  background: ${({ disabled }) => (disabled ? '#ccc' : '#00b0c8')};
  color: ${({ disabled }) => (disabled ? '#666' : '#333')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background 0.2s;
  font-family: inherit;
  min-width: 6rem;

  &:hover:not(:disabled) {
    background: #97ce4c;
  }
`;

export const PageInfo = styled.span`
  color: #666;

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
`;
