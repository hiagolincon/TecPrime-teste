import React, { useMemo } from 'react';
import {MdRemoveCircleOutline, MdAddCircleOutline, MdArrowBack} from 'react-icons/md';

import { Container, HeaderContainer, ProductTable, Total } from './styles';

import { useCart } from '../../hooks/cart';

import formatValue from '../../utils/formatValue';
import Header from '../../components/Header';
import { useHistory, withRouter } from 'react-router-dom';

export interface Product {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria_id: number;
  quantidade: number;
}

const CartComponent: React.FC = (props) => {
  const { increment, decrement, products } = useCart();

  console.log(props);
  const history = useHistory();

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }

  const cartTotal = useMemo(() => {
    const productsTotal = products.reduce(
      (acc, value) => acc + value.preco * value.quantidade,
      0,
    );

    return formatValue(productsTotal);
  }, [products]);


  return (
    <>
    <HeaderContainer>
    <button onClick={history.back}>
        <MdArrowBack size={20} color="#c53030" />
      </button>
      <Header title="Carrinho" />
    </HeaderContainer>
    <Container>

       <ProductTable>
        <thead>
          <tr>
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
          </tr>
        </thead>
        <tbody>
          {products && products.map((item: Product) => (
            <tr>
              <td>
                <h2>{item.nome}</h2>
                <strong>{formatValue(item.preco)}</strong>
              </td>

              <td>
                <div>
                  <button type="button" onClick={() => handleDecrement(item.id)}>
                    <MdRemoveCircleOutline size={20} color="#c53030" />
                  </button>
                  <input type="number" readOnly value={item.quantidade} />
                  <button type="button" onClick={() => handleIncrement(item.id)}>
                    <MdAddCircleOutline size={20} color="#c53030" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{formatValue(item.preco * item.quantidade)}</strong>
              </td>
            </tr>
          ))}
      </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{cartTotal}</strong>
        </Total>
      </footer>
    </Container>
    </>
  );
};

const Cart = withRouter(CartComponent)

export default Cart;
