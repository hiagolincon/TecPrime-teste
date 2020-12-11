import React from 'react';

import { Container } from './styles';

import { ReactComponent as Burguer } from '../../assets/hamburguer.svg';

const Loading: React.FC = () => {
  return (
    <Container>
      <Burguer />
      <h1>Hiago Food</h1>
    </Container>
  );
};

export default Loading;
