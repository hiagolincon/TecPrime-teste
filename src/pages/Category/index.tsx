import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from "react-router-dom";

import { CategoryList } from './styles';
import api from '../../services/api';
import Header from '../../components/Header';

interface CategoriesProps {
  id: number;
  nome: string;
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  const history = useHistory();

  useEffect(() => {
    async function loadCategorys(): Promise<void> {
      const response = await api.get('/categories');
      console.log(response.data);
      setCategories(response.data)
    }

    loadCategorys();
  },[]);

  return (
    <>
      <Header title="Categorias" />
      <CategoryList>
        {categories.map((category) => {
          return (
            <li key={category.id} onClick={() => history.push(`/product`, {id: category.id})}>
              <img src="" alt="" />
              <h2>{category.nome}</h2>
          </li>
          )
        })}
      </CategoryList>
    </>
  );
}

export default Category;
