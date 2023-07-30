import styled from "styled-components";
import * as Dialog from '@radix-ui/react-dialog';

export const Overlay = styled(Dialog.Overlay)`
  /* fixed -> fica sempre na mesma posicao da tela */
  position: fixed;
  /* para forcar que o overlay ocupe a tela inteira */
  width: 100vw;
  height: 100vh;
  /* substitui as propriedades top: 0; bottom: 0; left: 0; right: 0; */
  inset: 0;
  /* outra forma de aplicar #00000075 */
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${props => props.theme["gray-800"]};
  position: fixed;
  /* para centralizar elementos na tela */
  top: 50%;
  left: 50%;
  /* relativo ao tamanho do conteudo */
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    input {
      border-radius: 6px;
      border: 0;
      background: ${props => props.theme["gray-900"]};
      color: ${props => props.theme["gray-300"]};
      padding: 1rem;
      &::placeholder {
        color: ${props => props.theme["gray-500"]};
      }
    }
    button[type="submit"] {
      height: 50px;
      border: 0;
      background: ${props => props.theme["green-500"]};
      color: ${props => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.25rem;
      cursor: pointer;
      &:hover {
        background: ${props => props.theme["green-700"]};
        transition: background-color 0.2s;
      }
    }
  }
`;

export const CloseButton = styled(Dialog.Close)`
  /* Relativo aoconteudo nao tem necessidade de ser fixo, todo css deve ter as config resetadas */
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme["gray-500"]};
`;