import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
      transform: rotateY(0);
  }
  100% {
      transform: rotateY(180deg);
  }
`;
const slideTop = keyframes`
  0% {
    transform: translateY(100px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: #fff;
    letter-spacing: 12px;
    margin-top: 15px;
    animation: ${slideTop} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  svg {
    width: 100px;
    height: 100px;
    animation: ${rotate} 0.9s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
  }
`;
