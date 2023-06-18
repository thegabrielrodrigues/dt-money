import { ReactNode, useCallback, useEffect, useState } from 'react';

import { createContext } from 'use-context-selector';

import { TransactionDTO } from '@/dtos/TransactionDTO';
import { api } from '@/lib/axios';

interface CreateNewTransactionDTO {
  description: string;
  price: number;
  type: 'income' | 'expense';
  category: string;
}

interface TransactionsContextType {
  transactions: TransactionDTO[];
  fetchTransactions: (query?: string, pagination?: number) => void | any;
  createNewTransaction: (data: CreateNewTransactionDTO) => void;
  removeTransaction: (transactionId: number, currentPaginationIndex: number) => void;
  onPaginationIndexesChange: (paginationIndex: number) => void;
  pagination: number;
  paginationIndexes: number[];
}

interface TransactionsContextProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {
  const [pagination, setPagination] = useState<number>(1);
  const [paginationIndexes, setPaginationIndexes] = useState<number[]>([]);
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

  const renderizedTransactionsNumber = 5;

  const fetchTransactions = useCallback(async (query?: string, pagination: number = 1) => {
    const transactionsStartNumber = renderizedTransactionsNumber * pagination - renderizedTransactionsNumber;

    const { data, headers } = await api.get('/transactions', {
      params: {
        _start: transactionsStartNumber,
        _end: transactionsStartNumber + renderizedTransactionsNumber,
        q: query,
      },
    });

    const pagesTotal = Math.ceil(headers['x-total-count'] / renderizedTransactionsNumber);

    for (let i = 0; i < pagesTotal; i++) {
      paginationIndexes[i] = i + 1;
    }

    setTransactions(data);
    setPaginationIndexes([...paginationIndexes]);

    return { data };
  }, []);

  const createNewTransaction = useCallback(async (data: CreateNewTransactionDTO) => {
    const formattedData = { ...data, createdAt: new Date().toISOString() };

    await api.post('/transactions', formattedData);

    await fetchTransactions();
    setPagination(1);
  }, []);

  const removeTransaction = useCallback(async (transactionId: number, currentPaginationIndex: number) => {
    await api.delete(`/transactions/${transactionId}`);

    const { data } = await fetchTransactions(undefined, currentPaginationIndex);

    if (data.length === 0) {
      const previousPage = currentPaginationIndex - 1;

      setPagination(previousPage);
      fetchTransactions(undefined, previousPage);
    }
  }, []);

  const onPaginationIndexesChange = useCallback((paginationIndex: number) => {
    setPagination(paginationIndex);

    fetchTransactions(undefined, paginationIndex);
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createNewTransaction,
        removeTransaction,
        onPaginationIndexesChange,
        pagination,
        paginationIndexes,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
