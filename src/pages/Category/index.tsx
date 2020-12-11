import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Images

import { toast } from 'react-toastify';
import hamburguer from '../../assets/categories/hamburguer.jpg';
import porcao from '../../assets/categories/porcao.jpg';
import refri from '../../assets/categories/refrigerante.jpg';
import suco from '../../assets/categories/suco.jpg';

import { CategoryList } from './styles';
import api from '../../services/api';
import Header from '../../components/Header';
import Loading from '../../components/Loading';

interface CategoriesProps {
  id: number;
  nome: string;
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    async function loadCategorys(): Promise<void> {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
        // setTimeout usado somente para a demonstraçao melhor do login
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        toast.error('Erro ao listar categorias.');
      }
    }
    loadCategorys();
  }, []);

  const images = [
    { name: 'Hambúrgueres', img: hamburguer },
    { name: 'Refrigerantes', img: refri },
    { name: 'Sucos', img: suco },
    { name: 'Porções', img: porcao },
  ];

  const getImage = (name: string): string | undefined => {
    const get = images.find((image) => image.name === name);
    if (get) {
      return get.img;
    }
    return hamburguer;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header title="Categorias" />
      <CategoryList>
        {categories.map((category) => {
          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => history.push(`/product`, { id: category.id })}
              >
                <img src={getImage(category.nome)} alt={category.nome} />
                <h2>{category.nome}</h2>
              </button>
            </li>
          );
        })}
      </CategoryList>
    </>
  );
};

export default Category;
