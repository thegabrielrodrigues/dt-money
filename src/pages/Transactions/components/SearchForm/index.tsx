import { MagnifyingGlass } from '@phosphor-icons/react';

import { SearchFormContainer } from './styles';

export function SearchForm() {
  return (
    <SearchFormContainer>
      <input placeholder="Busque por transações" type="text" />
      <button>
        <MagnifyingGlass size={20} weight="bold" />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
