import React, { useCallback, useMemo } from 'react';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdArrowBack,
  MdClose,
} from 'react-icons/md';

import { useHistory } from 'react-router-dom';
import {
  Container,
  HeaderContainer,
  ProductTable,
  Total,
  ContainerEmpty,
} from './styles';

import { ReactComponent as EmptyCart } from '../../assets/emptyCard.svg';

import { useCart } from '../../hooks/cart';

import formatMoney from '../../utils/formatMoney';
import Header from '../../components/Header';

export interface Product {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria_id: number;
  quantidade: number;
}

const EmptyComponent: React.FC = () => {
  const history = useHistory();

  return (
    <ContainerEmpty>
      <span role="img" aria-label="bad">
        Oh não!!! O carrinho está vázio. 😭
      </span>
      <EmptyCart />
      <button type="button" onClick={() => history.push('/')}>
        Adicionar produtos
      </button>
    </ContainerEmpty>
  );
};

const Cart: React.FC = () => {
  const { increment, decrement, products, finalizate, deleteItem } = useCart();

  const isEmpty = products.length === 0;

  const handleDeleteItem = useCallback(
    (id: string): void => {
      deleteItem(id);
    },
    [deleteItem]
  );

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
  }

  const cartTotal = useMemo(() => {
    const productsTotal = products.reduce(
      (acc, value) => acc + value.preco * value.quantidade,
      0
    );

    return formatMoney(productsTotal);
  }, [products]);

  return (
    <>
      <HeaderContainer>
        <button
          type="button"
          onClick={() => {
            window.history.back();
          }}
        >
          <MdArrowBack size={20} color="#c53030" />
        </button>
        <Header title="Carrinho" />
      </HeaderContainer>
      {isEmpty ? (
        <EmptyComponent />
      ) : (
        <Container>
          <ProductTable>
            <thead>
              <tr>
                <th>PRODUTO</th>
                <th>QTD</th>
                <th>SUBTOTAL</th>
                <th>REMOVER ITEM</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item: Product) => (
                <tr>
                  <td>
                    <h2>{item.nome}</h2>
                    <strong>{formatMoney(item.preco)}</strong>
                  </td>

                  <td>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleDecrement(item.id)}
                      >
                        <MdRemoveCircleOutline size={20} color="#c53030" />
                      </button>
                      <input type="number" readOnly value={item.quantidade} />
                      <button
                        type="button"
                        onClick={() => handleIncrement(item.id)}
                      >
                        <MdAddCircleOutline size={20} color="#c53030" />
                      </button>
                    </div>
                  </td>
                  <td>
                    <strong>{formatMoney(item.preco * item.quantidade)}</strong>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => {
                        const condition = window.confirm(
                          'Certeza que deseja remover esse item do carrinho?'
                        );
                        if (condition) {
                          handleDeleteItem(item.id);
                        }
                      }}
                    >
                      <MdClose />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductTable>

          <footer>
            <button type="button" onClick={finalizate}>
              Finalizar pedido
            </button>

            <Total>
              <span>TOTAL</span>
              <strong>{cartTotal}</strong>
            </Total>
          </footer>
        </Container>
      )}
    </>
  );
};

export default Cart;
