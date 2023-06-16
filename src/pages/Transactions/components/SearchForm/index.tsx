import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useContextSelector } from 'use-context-selector';
import { z } from 'zod';

import { TransactionsContext } from '@/contexts/TransactionsContext';

import { SearchFormContainer } from './styles';

type SearchFormSchemaType = z.infer<typeof searchFormSchema>;

const searchFormSchema = z.object({
  query: z.string(),
});

export function SearchForm() {
  const fetchTransactions = useContextSelector(TransactionsContext, (context) => context.fetchTransactions);

  const { register, handleSubmit } = useForm<SearchFormSchemaType>({
    resolver: zodResolver(searchFormSchema),
  });

  function handleSearchTransactions(data: SearchFormSchemaType) {
    fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input placeholder="Busque por transações" type="text" {...register('query')} />
      <button>
        <MagnifyingGlass size={20} weight="bold" />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
