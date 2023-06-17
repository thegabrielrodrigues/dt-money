import styled from 'styled-components';

import { env } from '@/environment';

export const TransactionsTableContainer = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;

  tbody {
    td {
      padding: 1.25rem 2rem;
      background-color: ${({ theme }) => theme['gray-700']};

      &:first-child {
        width: 50%;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
      }

      &:last-child {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
    }
  }

  @media screen and (max-width: ${env.BREAKPOINTS.CELL_PHONE}) {
    border-spacing: 0;

    tbody {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      tr {
        padding: 1.25rem;
        border-radius: 6px;
        background-color: ${({ theme }) => theme['gray-700']};
        display: grid;
        grid-template-columns: 3fr 1fr;
        grid-template-rows: 1fr 2fr 1fr;
        grid-gap: 0.5rem;

        td {
          width: 100% !important;
          padding: 0 !important;
          border-radius: 0 !important;
          background-color: transparent;

          &:nth-child(1) {
            color: ${({ theme }) => theme['gray-300']};
            grid-column: 1 / 3;
            grid-row: 1 / 2;
          }

          &:nth-child(2) {
            font-size: 1.25rem;
            font-weight: bold;
            grid-column: 1 / 3;
            grid-row: 2 / 3;
          }

          &:nth-child(3) {
            color: ${({ theme }) => theme['gray-500']};
            display: flex;
            grid-column: 1 / 2;
            grid-row: 3 / 4;
            gap: 0.25rem;
          }

          &:nth-child(4) {
            color: ${({ theme }) => theme['gray-500']};
            display: flex;
            justify-content: flex-end;
            grid-column: 2 / 3;
            grid-row: 3 / 4;
            gap: 0.25rem;
          }
        }
      }
    }
  }
`;

interface PriceHighlightProps {
  variant: 'income' | 'expense';
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${({ theme, variant }) => {
    switch (variant) {
      case 'income':
        return theme['green-300'];
      case 'expense':
        return theme['red-300'];
    }
  }};
`;
