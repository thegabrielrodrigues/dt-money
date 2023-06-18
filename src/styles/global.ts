import { createGlobalStyle } from 'styled-components';

import { env } from '@/environment';

export const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme['gray-800']};
    color: ${({ theme }) => theme['gray-100']};
  }

  body, input, textarea, button {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
    font-weight: normal;
  }

  :focus {
    outline: none;
  }

  @media screen and (max-width: ${env.BREAKPOINTS.TABLET}) {
    body, input, textarea, button {
      font-size: 87.5% !important;
    }
  }
`;
