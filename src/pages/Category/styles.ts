import styled from 'styled-components';

export const CategoryList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
  list-style: none;
  max-width: 500px;
  margin: auto;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding-bottom: 20px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #c53030;

      h2 {
        color: #fff;
      }
    }

    button {
      background: transparent;
      border: 0;
    }

    img {
      align-self: center;
      max-width: 750px;
      width: 100%;
    }

    h2 {
      font-size: 24px;
      line-height: 20px;
      color: #333;
      margin-top: 15px;
      transition: color 0.2s;
    }
  }
`;
