import { useEffect, useState } from 'react';

import { TransactionDTO } from '@/dtos/TransactionDTO';
import { env } from '@/environment/env';

import { PriceHighlight, TransactionsTableContainer } from './styles';

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

  async function fetchTransactions() {
    const response = await fetch(`${env.API_URL}/transactions`);
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

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
