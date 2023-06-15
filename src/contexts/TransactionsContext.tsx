import { ReactNode, createContext, useEffect, useState } from 'react';

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
  fetchTransactions: (query?: string) => void;
  createNewTransaction: (data: CreateNewTransactionDTO) => void;
}

interface TransactionsContextProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

  async function fetchTransactions(query?: string) {
    const { data } = await api.get('/transactions', {
      params: {
        q: query,
      },
    });

    setTransactions(data);
  }

  async function createNewTransaction(data: CreateNewTransactionDTO) {
    const formattedData = { ...data, createdAt: new Date().toISOString() };

    await api.post('/transactions', formattedData);
    fetchTransactions();
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createNewTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
