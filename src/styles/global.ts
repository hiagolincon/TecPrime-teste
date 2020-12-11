import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;

    &::-webkit-scrollbar {
      width: 10px;
      background-color: #c53030;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #fff;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      background-color: #c53030;
    }

  }

  body {
    background: #191920;
    -webkit-font-smoothing: antialiased !important;
    font-family: 'Roboto', sans-serif;
  }

  body, input, button {
    font: 14px sans-serif;
    font-family: 'Roboto', sans-serif;
  }
  a {
    text-decoration: none;
    font-family: 'Roboto', sans-serif;
  }

  #root {
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }

  button {
    cursor: pointer;
  }
`;
