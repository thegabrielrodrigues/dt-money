import { useContextSelector } from 'use-context-selector';

import { TransactionsContext } from '@/contexts/TransactionsContext';

import { PaginationContainer, PaginationIndexButton } from './styles';

export function Pagination() {
  const pagination = useContextSelector(TransactionsContext, (context) => context.pagination);
  const paginationIndexes = useContextSelector(TransactionsContext, (context) => context.paginationIndexes);
  const onPaginationIndexesChange = useContextSelector(TransactionsContext, (context) => context.onPaginationIndexesChange);

  function handlePaginationIndexesChange(paginationIndex: number) {
    onPaginationIndexesChange(paginationIndex);
  }

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
