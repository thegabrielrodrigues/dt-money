import styled from 'styled-components';

import { PaginationContainer } from '@/components/Pagination/styles';
import { env } from '@/environment';

export const TransactionsContainer = styled.div`
  main {
    max-width: 70rem;
    padding: 4rem 1.5rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow: hidden;
  }

  ${PaginationContainer} {
    margin-top: 2.25rem;
  }

  @media screen and (max-width: ${env.BREAKPOINTS.CELL_PHONE}) {
    main {
      padding: 1.5rem;
      gap: 0.75rem;
    }
  }
`;
