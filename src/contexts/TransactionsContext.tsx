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
}

// tipando a propriedade childen
interface TransactionsProviderProps {
  // ReactNode -> qualquer elemento valido no reat
  children: ReactNode
}


export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    // chama o metodo e passa o endereco e a mesma devolve uma resposta atraves do conceito de promisse
    // nao e recomendavel utilizar .then({then({})}), quando estamos trabalhando com promisses se dentro de um .then(.. retornar outro /then(..., )
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json()

    setTransactions(data)
  }

  // forma de fazer uma funcao assyncrona, useEffect nao pode ser assyncrono
  useEffect(() => {
    loadTransactions()
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}