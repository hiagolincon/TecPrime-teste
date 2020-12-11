import React, { useCallback, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdArrowBack } from 'react-icons/md';
import api from '../../services/api';
import { useCart } from '../../hooks/cart';

import FloatingCart from '../../components/FloatingCart';

import { ProductList, HeaderContainer } from './styles';
import Header from '../../components/Header';
import formatMoney from '../../utils/formatMoney';
import Loading from '../../components/Loading';

interface ProductProp {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria_id: number;
  quantidade: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductProp[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { id } = location.state;
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      try {
        const response = await api.post('/products', {
          category: id,
        });
        setProducts(response.data);
        // setTimeout usado somente para a demonstraçao melhor do login
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        toast.error(
          'Erro ao listar produtos, por favor tente novamente mais tarde.'
        );
      }
    };

    loadProducts();
  }, [id]);

  const handleAddToCart = useCallback(
    (item: ProductProp): void => {
      addToCart(item);
      toast.info(`${item.nome} adicionado ao carrinho.`);
    },
    [addToCart]
  );

  if (loading) {
    return <Loading />;
  }

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
        <Header title="Produtos" />
      </HeaderContainer>
      <ProductList>
        {products &&
          products.map((item) => (
            <li key={item.id}>
              <h2>{item.nome}</h2>
              <strong>Preço: {formatMoney(item.preco)}</strong>
              <p>{item.descricao}</p>
              <button type="button" onClick={() => handleAddToCart(item)}>
                Adicionar ao carrinho
              </button>
            </li>
          ))}
        <FloatingCart />
      </ProductList>
    </>
  );
};

export default Products;
