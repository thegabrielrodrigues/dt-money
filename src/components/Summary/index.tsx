import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from '@phosphor-icons/react';

import { SummaryCard, SummaryContainer } from './styles';

export function Summary() {
  return (
    <SummaryContainer>
      <SummaryCard>
        <div className="top">
          <span>Entradas</span>
          <ArrowCircleUp size={32} />
        </div>
        <strong>R$ 17.400,00</strong>
      </SummaryCard>

      <SummaryCard>
        <div className="top">
          <span>Saídas</span>
          <ArrowCircleDown size={32} />
        </div>
        <strong>R$ 1.259,00</strong>
      </SummaryCard>

      <SummaryCard variantColor="green">
        <div className="top">
          <span>Total</span>
          <CurrencyDollar size={32} />
        </div>
        <strong>R$ 16.141,00</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
