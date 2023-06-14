import { ReactNode, createContext, useEffect, useState } from 'react';

import { TransactionDTO } from '@/dtos/TransactionDTO';
import { env } from '@/environment/env';

interface TransactionsContextType {
  transactions: TransactionDTO[];
}

interface TransactionsContextProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([]);

  async function fetchTransactions() {
    const response = await fetch(`${env.API_URL}/transactions`);
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return <TransactionsContext.Provider value={{ transactions }}>{children}</TransactionsContext.Provider>;
}
