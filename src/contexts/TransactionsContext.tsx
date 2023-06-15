import { ReactNode, createContext, useEffect, useState } from 'react';

import { TransactionDTO } from '@/dtos/TransactionDTO';
import { env } from '@/environment/env';

interface TransactionsContextType {
  transactions: TransactionDTO[];
  fetchTransactions: (query?: string) => void;
}

interface TransactionsContextProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

  async function fetchTransactions(query?: string) {
    const url = new URL(`${env.API_URL}/transactions`);

    if (query) {
      url.searchParams.append('q', query);
    }

    const response = await fetch(url);
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>{children}</TransactionsContext.Provider>;
}
