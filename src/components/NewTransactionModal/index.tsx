import { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowCircleDown, ArrowCircleUp, X } from '@phosphor-icons/react';
import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useContextSelector } from 'use-context-selector';
import { z } from 'zod';

import { TransactionsContext } from '@/contexts/TransactionsContext';

import { Content, Overlay, TransactionTypeButton } from './styles';

type NewTransactionModalSchemaType = z.infer<typeof newTransactionModalSchema>;

interface NewTransactionModalProps {
  children: ReactNode;
}

const newTransactionModalSchema = z.object({
  description: z.string().min(1, 'Digite a descrição da transação'),
  price: z.number({ invalid_type_error: 'Insira o valor da transação' }).min(1, 'Insira um valor maior que zero'),
  category: z.string().min(1, 'Digite a categoria da transação'),
  type: z.enum(['income', 'expense']),
});

export function NewTransactionModal({ children }: NewTransactionModalProps) {
  const createNewTransaction = useContextSelector(TransactionsContext, (context) => context.createNewTransaction);

  const { register, formState, handleSubmit, reset, control } = useForm<NewTransactionModalSchemaType>({
    resolver: zodResolver(newTransactionModalSchema),
    defaultValues: {
      description: '',
      price: 0,
      category: '',
      type: 'income',
    },
  });

  async function handleCreateNewTransaction(data: NewTransactionModalSchemaType) {
    createNewTransaction(data);

    reset();
  }

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
          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <div>
              <input placeholder="Descrição" type="text" {...register('description')} />
              <p>{formState.errors.description?.message}</p>
            </div>
            <div>
              <input placeholder="Preço" type="text" {...register('price', { valueAsNumber: true })} />
              <p>{formState.errors.price?.message}</p>
            </div>
            <div>
              <input placeholder="Categoria" type="text" {...register('category')} />
              <p>{formState.errors.category?.message}</p>
            </div>

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <RadioGroup.Root className="transaction_type" onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton value="expense">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </RadioGroup.Root>
              )}
            />

            <button type="submit">Cadastrar</button>
          </form>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
