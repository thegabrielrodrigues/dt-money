import { useEffect, useState } from 'react';

import { useContextSelector } from 'use-context-selector';

import { TransactionsContext } from '@/contexts/TransactionsContext';

import { PaginationContainer, PaginationIndexButton } from './styles';

export function Pagination() {
  const [pagination, setPagination] = useState<number>(1);

  const fetchTransactions = useContextSelector(TransactionsContext, (context) => context.fetchTransactions);
  const paginationIndexes = useContextSelector(TransactionsContext, (context) => context.paginationIndexes);

  function handlePaginationIndexesChange(paginationIndex: number) {
    setPagination(paginationIndex);
  }

  useEffect(() => {
    fetchTransactions(undefined, pagination);
  }, [pagination]);

  return (
    <PaginationContainer>
      <div className="pagination_indexes">
        {paginationIndexes.map((paginationIndex) => {
          const isActive = paginationIndex === pagination;

          return (
            <PaginationIndexButton
              key={paginationIndex}
              className="pagination_index"
              onClick={() => handlePaginationIndexesChange(paginationIndex)}
              isActive={isActive}
            >
              <span>{paginationIndex}</span>
            </PaginationIndexButton>
          );
        })}
      </div>
    </PaginationContainer>
  );
}
