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
  fetchTransactions: (query?: string, pagination?: number) => void;
  createNewTransaction: (data: CreateNewTransactionDTO) => void;
  paginationIndexes: number[];
}

interface TransactionsContextProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {
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
  }, []);

  const createNewTransaction = useCallback(async (data: CreateNewTransactionDTO) => {
    const formattedData = { ...data, createdAt: new Date().toISOString() };

    await api.post('/transactions', formattedData);
    fetchTransactions();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createNewTransaction, paginationIndexes }}>
      {children}
    </TransactionsContext.Provider>
  );
}
