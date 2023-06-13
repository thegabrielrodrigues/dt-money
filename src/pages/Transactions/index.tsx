import { Header } from '@/components/Header';
import { Summary } from '@/components/Summary';
import { TransactionsTable } from '@/components/TransactionsTable';

import { TransactionsContainer } from './styles';

export function Transactions() {
  return (
    <TransactionsContainer>
      <Header />
      <Summary />

      <main>
        <TransactionsTable />
      </main>
    </TransactionsContainer>
  );
}
