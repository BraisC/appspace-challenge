import type { ReactNode } from 'react';
import { Container, Logo } from './Layout.styles';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Logo src="/logo.png" alt="Rick and Morty" />
      {children}
    </Container>
  );
};
