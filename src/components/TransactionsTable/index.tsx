import { CalendarBlank, TagSimple, Trash } from '@phosphor-icons/react';
import { useContextSelector } from 'use-context-selector';

import { TransactionsContext } from '@/contexts/TransactionsContext';
import { env } from '@/environment';
import { useWindowDimension } from '@/hooks/useWindowDimension';
import { dateFormatter, priceFormatter } from '@/utils/formatter';

import { PriceHighlight, TransactionsTableContainer } from './styles';

export function TransactionsTable() {
  const pagination = useContextSelector(TransactionsContext, (context) => context.pagination);
  const removeTransaction = useContextSelector(TransactionsContext, (context) => context.removeTransaction);
  const transactions = useContextSelector(TransactionsContext, (context) => context.transactions);
  const windowDimension = useWindowDimension();

  const isCellPhoneDevice = windowDimension.width <= Number(env.BREAKPOINTS.CELL_PHONE.replace('px', ''));

  function handleRemoveTransaction(transactionId: number) {
    removeTransaction(transactionId, pagination);
  }

  return (
    <TransactionsTableContainer>
      <tbody>
        {transactions.map((transaction) => {
          const formattedDate = dateFormatter(new Date(transaction.createdAt));
          const formattedPrice = `${transaction.type === 'expense' ? '- ' : ''}${priceFormatter(transaction.price)}`;

          return (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>
                <PriceHighlight variant={transaction.type}>{formattedPrice}</PriceHighlight>
              </td>
              <td>
                {isCellPhoneDevice && <TagSimple />}
                {transaction.category}
              </td>
              <td>
                {isCellPhoneDevice && <CalendarBlank />}
                {formattedDate}
              </td>
              <td>
                <button className="trash_btn" onClick={() => handleRemoveTransaction(transaction.id)}>
                  <Trash fontSize={20} />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </TransactionsTableContainer>
  );
}
