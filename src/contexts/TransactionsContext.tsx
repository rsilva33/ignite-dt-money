import { createContext, ReactNode, useEffect, useState } from 'react';

// quando cria o estado e necessario tipar principalmente array ou objetos
interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
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
    async function fetchTransactions(query?: string) {
      const url = new URL('http://localhost:3333/transactions');
  
      if (query) {
        url.searchParams.append('q', query);
      }
  
    const response = await fetch(url)
    const data = await response.json()

    setTransactions(data)
  }

  // forma de fazer uma funcao assyncrona, useEffect nao pode ser assyncrono
  useEffect(() => {
    fetchTransactions()
  }, []);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}