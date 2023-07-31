import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { SummaryCard, SummaryContainer } from "./styles";

export function Summary() {
  const { transactions } = useContext(TransactionsContext)

  console.log(transactions)
  
  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          {/* estilizar sempre a tag que esta por volta do texto, todo texto  deve ter algum tipo de tag */}
          <span>Entries</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>$ 17.400,00</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Outputs</span>
          <ArrowCircleDown size={32} color="#f75a68" />
        </header>

        <strong>$ 17.400,00</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>$ 17.400,00</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}