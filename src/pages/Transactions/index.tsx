import { Header } from '@/components/Header';
import { Pagination } from '@/components/Pagination';
import { Summary } from '@/components/Summary';
import { TransactionsTable } from '@/components/TransactionsTable';

import { SearchForm } from './components/SearchForm';
import { TransactionsContainer } from './styles';

export function Transactions() {
  return (
    <TransactionsContainer>
      <Header />
      <Summary />

      <main>
        <SearchForm />
        <TransactionsTable />
        <Pagination />
      </main>
    </TransactionsContainer>
  );
}
