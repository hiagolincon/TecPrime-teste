import React, { useEffect, useState } from 'react';

import api from '../../services/api';
import { useCart } from '../../hooks/cart';

import FloatingCart from '../../components/FloatingCart';

import { ProductList } from './styles';
import {RouteComponentProps} from "react-router";
import { withRouter } from 'react-router-dom';
import Header from '../../components/Header';

interface IProduct {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria_id: number;
  quantidade: number;
}

interface IProps extends RouteComponentProps {

};

const ProductsComponent: React.FC<IProps> = ({ location }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { id } = location;
  console.log()
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts () {
      const response = await api.post('/products', {
        category: id
      });

      setProducts(response.data);
    }

    loadProducts()
  }, [])

  function handleAddToCart(item: IProduct): void {
    addToCart(item);
  }

  // const arrayImgs = {
  //   'hamburgues': '',
  //   'refri': ''
  // }


  return (
    <>
    <Header title="Produtos" />
      <ProductList>
      {products && products.map((item) => (
        <li key={item.id}>
          <h2>{item.nome}</h2>
          {/* <img src={arrayImgs[item.nome]} alt=""/> */}
          <strong>Preço: ${item.preco}</strong>
          <p>{item.descricao}</p>
          <button onClick={() => handleAddToCart(item)}>Adicionar ao carrinho</button>
        </li>
      ))}
      <FloatingCart />
    </ProductList>
    </>
  );
}


const Products = withRouter(ProductsComponent);


export default Products;
