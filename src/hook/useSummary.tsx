import { useContext } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const { transactions } = useContext(TransactionsContext);

  // reduce -> permite percorrer um array e reduzir o array por alguma nova estrutura de dados
  // primeiro parametro -> funcao
  // segundo parametro -> estrutura de dados inicial
  // const summary => transactions.reduce(*1-primeiro parametro*() => {}, *2-segundo parametro* {income: 0, outcome: 0, total: 0})
  const summary = transactions.reduce(
    // acc -> accumulator
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    },
  );

  return summary;
}