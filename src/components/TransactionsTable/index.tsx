import { PriceHighlight, TransactionsTableContainer } from './styles';

export function TransactionsTable() {
  return (
    <TransactionsTableContainer>
      <tbody>
        <tr>
          <td width="50%">Desenvolvimento de site</td>
          <td>
            <PriceHighlight variant="income">R$ 12.0000,00</PriceHighlight>
          </td>
          <td>Venda</td>
          <td>13/04/2022</td>
        </tr>
        <tr>
          <td width="50%">Hamburguer</td>
          <td>
            <PriceHighlight variant="expense">- R$ 59,00</PriceHighlight>
          </td>
          <td>Alimentação</td>
          <td>10/04/2022</td>
        </tr>
        <tr>
          <td width="50%">Aluguel do apartamento</td>
          <td>
            <PriceHighlight variant="expense">- R$ 1.200,00</PriceHighlight>
          </td>
          <td>Casa</td>
          <td>27/03/2022</td>
        </tr>
      </tbody>
    </TransactionsTableContainer>
  );
}
