import { ReactNode } from 'react';

import { ArrowCircleDown, ArrowCircleUp, X } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';

import { Content, Overlay, TransactionTypeButton } from './styles';

interface NewTransactionModalProps {
  children: ReactNode;
}

export function NewTransactionModal({ children }: NewTransactionModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild={true} children={children} />
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>
          <Dialog.Close className="btn-close">
            <X size={24} />
          </Dialog.Close>
          <form>
            <input placeholder="Descrição" type="text" />
            <input placeholder="Preço" type="text" />
            <input placeholder="Categoria" type="text" />

            <RadioGroup.Root className="transaction_type">
              <TransactionTypeButton value="income">
                <ArrowCircleUp size={24} />
                Entrada
              </TransactionTypeButton>
              <TransactionTypeButton value="expense">
                <ArrowCircleDown size={24} />
                Saída
              </TransactionTypeButton>
            </RadioGroup.Root>

            <button type="submit">Cadastrar</button>
          </form>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
