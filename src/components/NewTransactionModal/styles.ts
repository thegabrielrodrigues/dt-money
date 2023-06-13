import styled from 'styled-components';

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  position: fixed;
  inset: 0;
`;

export const Content = styled.div`
  width: 32rem;
  padding: 2.5rem 3rem;
  border-radius: 6px;
  background-color: ${({ theme }) => theme['gray-800']};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .btn-close {
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme['gray-500']};
    line-height: 0;
    cursor: pointer;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
  }

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      padding: 1rem;
      border: none;
      border-radius: 6px;
      background-color: ${({ theme }) => theme['gray-900']};
      color: ${({ theme }) => theme['gray-300']};

      &:focus {
        box-shadow: 0 0 0 1px ${({ theme }) => theme['green-300']};
      }

      &::placeholder {
        color: ${({ theme }) => theme['gray-500']};
      }
    }

    button[type='submit'] {
      padding: 1rem 2rem;
      border: none;
      border-radius: 6px;
      margin-top: 2rem;
      background-color: ${({ theme }) => theme['green-500']};
      color: ${({ theme }) => theme['white']};
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.1s;

      &:hover {
        background-color: ${({ theme }) => theme['green-700']};
      }
    }
  }
`;
