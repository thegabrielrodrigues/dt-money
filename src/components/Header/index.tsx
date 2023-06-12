import Logo from '@/assets/logo.svg';

import { HeaderContainer, NewTransactionButton } from './styles';

export function Header() {
  return (
    <HeaderContainer>
      <div className="layout">
        <img src={Logo} />

        <NewTransactionButton>Nova transação</NewTransactionButton>
      </div>
    </HeaderContainer>
  );
}
