import styled, { css } from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;

  .pagination_indexes {
    display: flex;
    gap: 0.5rem;
  }
`;

interface PaginationIndexButtonProps {
  isActive: boolean;
}

export const PaginationIndexButton = styled.button<PaginationIndexButtonProps>`
  height: 2.5rem;
  width: 2.5rem;
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme['gray-600']};
  color: ${({ theme }) => theme['gray-400']};
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.1s;
  ${({ theme, isActive }) =>
    isActive &&
    css`
      background-color: ${theme['green-700']};
      color: ${theme['white']};
    `}

  &:hover {
    opacity: 0.8;
  }
`;
