import { useContext } from 'react';

import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from '@phosphor-icons/react';

import { TransactionsContext } from '@/contexts/TransactionsContext';
import { priceFormatter } from '@/utils/formatter';

import { SummaryCard, SummaryContainer } from './styles';

export function Summary() {
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

  return (
    <SummaryContainer>
      <SummaryCard>
        <div className="top">
          <span>Entradas</span>
          <ArrowCircleUp size={32} />
        </div>
        <strong>{formattedSummary.income}</strong>
      </SummaryCard>

      <SummaryCard>
        <div className="top">
          <span>Saídas</span>
          <ArrowCircleDown size={32} />
        </div>
        <strong>{formattedSummary.expense}</strong>
      </SummaryCard>

      <SummaryCard variantColor="green">
        <div className="top">
          <span>Total</span>
          <CurrencyDollar size={32} />
        </div>
        <strong>{formattedSummary.total}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
