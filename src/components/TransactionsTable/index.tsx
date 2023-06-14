import { useContext } from 'react';

import { TransactionsContext } from '@/contexts/TransactionsContext';
import { dateFormatter, priceFormatter } from '@/utils/formatter';

import { PriceHighlight, TransactionsTableContainer } from './styles';

export function TransactionsTable() {
  const { transactions } = useContext(TransactionsContext);

  return (
    <TransactionsTableContainer>
      <tbody>
        {transactions.map((transaction) => {
          const formattedDate = dateFormatter(new Date(transaction.createdAt));
          const formattedPrice = `${transaction.type === 'expense' ? '- ' : ''}${priceFormatter(transaction.price)}`;

          return (
            <tr key={transaction.id}>
              <td width="50%">{transaction.description}</td>
              <td>
                <PriceHighlight variant={transaction.type}>{formattedPrice}</PriceHighlight>
              </td>
              <td>{transaction.category}</td>
              <td>{formattedDate}</td>
            </tr>
          );
        })}
      </tbody>
    </TransactionsTableContainer>
  );
}
