import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

// quando cria o estado e necessario tipar principalmente array ou objetos
interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

export function Transactions(){
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
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
      <SearchForm />
      
        <TransactionsTable>
          <tbody>
          {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.price}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}