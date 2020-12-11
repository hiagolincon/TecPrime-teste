import styled from 'styled-components';
import { darken } from 'polished';

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 750px;
    }

    h2 {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
      text-align: center;
    }
    strong {
      margin: 10px 0 5px;
    }

    p {
      color: #333;
    }

    button {
      margin-top: 20px;
      background: #c53030;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      padding: 12px;
      font-size: 16px;
      font-weight: 700;

      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.07, '#c53030')};
      }
    }
  }
`;

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    position: absolute;
    left: 0;
    background: transparent;
    border: 0;
    display: flex;
    align-items: center;
  }
`;
