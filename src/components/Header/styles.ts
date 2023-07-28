import styled from "styled-components";

// ocupa a largura toda do usuario
export const HeaderContainer = styled.header`
  background: ${props => props.theme["gray-900"]};
  /* 2.5 Topo, 0 lateral direita, 7.5 baixo, lateral esquerda */
  padding: 2.5rem 0 7.5rem;
`;
// conteudo fixado com limite
export const HeaderContent = styled.div`
  width: 100%;
  /* se a tela for menor que 1120 ela vai ter 100%  se for maior limita a 1120 */
  max-width: 1120px;
  /* centraliza */
  margin: 0 auto;
  /* se for menor do que o tamanho o conteudo nao fica grutado nas laterais */
  padding: 0 1.5rem;

  /* logo e botao fiquem com espaco entre eles e verticalmente alinhados ao centro */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NewTransactionButton = styled.button`
  height: 50px;
  border: 0;
  background: ${props => props.theme["green-500"]};
  color: ${props => props.theme["white"]};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme["green-700"]};
    /* da para ser utilizado no componente pai para mudar o efeito */
    transition: background-color 0.2s;
  }
`;