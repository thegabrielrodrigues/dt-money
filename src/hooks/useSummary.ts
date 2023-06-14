import { useContext } from 'react';

import { TransactionsContext } from '@/contexts/TransactionsContext';
import { priceFormatter } from '@/utils/formatter';

export function useSummary() {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce(
    (prev, curr) => {
      switch (curr.type) {
        case 'income':
          prev.income += curr.price;
          prev.total += curr.price;

          return prev;
        case 'expense':
          prev.expense += curr.price;
          prev.total -= curr.price;

          return prev;
      }
    },
    { income: 0, expense: 0, total: 0 }
  );

  const formattedSummary = {
    income: priceFormatter(summary.income),
    expense: priceFormatter(summary.expense),
    total: priceFormatter(summary.total),
  };

  return formattedSummary;
}
