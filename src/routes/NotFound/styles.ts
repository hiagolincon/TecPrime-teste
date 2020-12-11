import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 20px;
    color: #fff;
  }

  button {
    background: #fff;
    color: #c53030;
    border: 0;
    border-radius: 4px;
    padding: 12px 20px;
    font-weight: bold;
    text-transform: uppercase;
    transition: background 0.2s;
    margin-top: 35px;
  }

  svg {
    width: 300px;
    height: 300px;
  }
`;
