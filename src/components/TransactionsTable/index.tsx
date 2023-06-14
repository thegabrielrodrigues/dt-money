import { useContext } from 'react';

import { TransactionsContext } from '@/contexts/TransactionsContext';

import { PriceHighlight, TransactionsTableContainer } from './styles';

export function TransactionsTable() {
  const { transactions } = useContext(TransactionsContext);

  return (
    <TransactionsTableContainer>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td width="50%">{transaction.description}</td>
            <td>
              <PriceHighlight variant={transaction.type}>R$ {transaction.price}</PriceHighlight>
            </td>
            <td>{transaction.category}</td>
            <td>{transaction.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </TransactionsTableContainer>
  );
}
