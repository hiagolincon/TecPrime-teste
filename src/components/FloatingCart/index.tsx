import React, { useState, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';


// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const history = useHistory();

  const cartTotal = useMemo(() => {
    const productsTotal = products.reduce(
      (acc, value) => acc + value.preco * value.quantidade,
      0,
    );

    return formatValue(productsTotal);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    const productsLength = products.reduce(
      (acc, value) => acc + value.quantidade,
      0,
    );

    return productsLength;
  }, [products]);

  return (
    <Container>
      <CartButton
        onClick={() => history.push('/cart')}
      >
        {/* <FeatherIcon name="shopping-cart" size={24} color="#fff" /> */}
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
