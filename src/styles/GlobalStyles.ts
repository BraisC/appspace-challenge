import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-teal: #00b0c8;
    --color-lime: #97ce4c;
    --color-lime-light: rgba(151, 206, 76, 0.2);
    --color-lime-glow: rgba(151, 206, 76, 0.4);
    --color-text: #333;
    --color-text-muted: #666;
    --color-disabled: #ccc;
    --color-border: #eee;
  }
`;
