import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  position: fixed;
  bottom: 15px;
  right: 15px;
  flex-direction: row;
  background: transparent;
  justify-content: space-between;
  align-items: center;
`;

export const CartButton = styled.button`
  position: relative;
  background: #e83f5b;
  border: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  flex: 1;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#e83f5b')};
  }

  svg {
    width: 35px;
    height: 35px;
    color: #fff;
  }
`;

export const CartButtonText = styled.p`
  position: absolute;
  top: -7px;
  right: -7px;
  background: #e83f5b;
  color: #fff;
  width: 27px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
