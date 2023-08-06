import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'

import { api } from '../lib/axios';

// quando cria o estado e necessario tipar principalmente array ou objetos
interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

// tipando a propriedade childen
interface TransactionsProviderProps {
  // ReactNode -> qualquer elemento valido no reat
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

    // chama o metodo e passa o endereco e a mesma devolve uma resposta atraves do conceito de promisse
    // nao e recomendavel utilizar .then({then({})}), quando estamos trabalhando com promisses se dentro de um .then(.. retornar outro /then(..., )
    const fetchTransactions = useCallback(async (query?: string) => {
      const response = await api.get('transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          q: query,
        }
      })
  
      setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  // forma de fazer uma funcao assyncrona, useEffect nao pode ser assyncrono
  useEffect(() => {
    fetchTransactions()
  }, []);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}