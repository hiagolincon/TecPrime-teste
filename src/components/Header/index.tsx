import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';

interface TitleProps {
  title: string;
}

const Header: React.FC<TitleProps> = ({ title }) => {
  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  );
}

export default Header;
