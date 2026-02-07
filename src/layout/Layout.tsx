import type { ReactNode } from 'react';
import { Container, Title } from './Layout.styles';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Title>Rick and Morty Characters</Title>
      {children}
    </Container>
  );
};
