import { ThemeProvider } from 'styled-components';

import { Transactions } from '@/pages/Transactions';
import { GlobalStyle } from '@/styles/global';
import { defaultTheme } from '@/styles/themes/default';

import { TransactionsContextProvider } from './contexts/TransactionsContext';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsContextProvider>
        <Transactions />
      </TransactionsContextProvider>
    </ThemeProvider>
  );
}
