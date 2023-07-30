import styled, { css } from "styled-components";

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  /* 3 colunas dentro do grid todas com o mesmo tamanho */
  grid-template-columns: repeat(3, 1fr);
  /* espacamento entre elas */
  gap: 2rem;
  /* fica por cima da tag Header */
  margin-top: -5rem;
`;

interface SummaryCardProps {
  variant?: "green"
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${props => props.theme["gray-600"]};
  border-radius: 6px;
  padding: 2rem;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme["gray-300"]};
  }
  strong {
    /* por padrao a tag strong vem display inline e nao tem como aplicar margin vertical em tags com display inline */
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }
  /* estilizacao condicional */
  ${props => props.variant === "green" && css`
    background: ${props.theme["green-700"]}
  `}
`;