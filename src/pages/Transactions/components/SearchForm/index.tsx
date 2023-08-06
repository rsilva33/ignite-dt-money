import { MagnifyingGlass } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import { SearchFormContainer } from './styles';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../../../contexts/TransactionsContext';

const searchFormSchema = z.object({
  query: z.string(),
});

// retorna qual e a tipagem dos campos do formulario
type SearchFormInputs = z.infer<typeof searchFormSchema>;

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )

  const {
    register,
    handleSubmit,
    // desestruturando uma propriedade interna
    // isSubmitting -> retorna um true ou false dizendo em qual estado o formulario esta submit ou nao
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  // acoes a ser disparadas atraves de um usuario e legal iniciar o nome handle
  async function handleSearchTransactions(data: SearchFormInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" placeholder="Search for transactions" {...register('query')} />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Search
      </button>
    </SearchFormContainer>
  );
}