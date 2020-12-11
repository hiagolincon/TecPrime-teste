import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { BiShoppingBag } from 'react-icons/bi';
import { Container, CartButton, CartButtonText } from './styles';

import formatMoney from '../../utils/formatMoney';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const history = useHistory();

  const totalItensInCart = useMemo(() => {
    const productsLength = products.reduce(
      (acc, value) => acc + value.quantidade,
      0
    );

    return productsLength;
  }, [products]);

  return (
    <Container>
      <CartButton onClick={() => history.push('/cart')}>
        <CartButtonText>{totalItensInCart}</CartButtonText>
        <BiShoppingBag />
      </CartButton>
    </Container>
  );
};

export default FloatingCart;
