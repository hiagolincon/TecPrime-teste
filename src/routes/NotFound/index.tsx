import React from 'react';

import { useHistory } from 'react-router-dom';
import { Container } from './styles';

import { ReactComponent as NotFoundIcon } from '../../assets/404.svg';

const NotFound: React.FC = () => {
  const history = useHistory();
  return (
    <Container>
      <NotFoundIcon />
      <span role="img" aria-label="bad">
        Oh não!!! Não conseguimos achar o que você procurava. (͡• ͜ʖ ͡•)
      </span>
      <button type="button" onClick={() => history.push('/')}>
        Voltar ao inicio.
      </button>
    </Container>
  );
};

export default NotFound;
