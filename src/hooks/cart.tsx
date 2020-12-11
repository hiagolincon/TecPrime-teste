import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Product {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria_id: number;
  quantidade: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
  finalizate(): void;
  deleteItem(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const history = useHistory();

  useEffect(() => {
    const loadProducts = async (): Promise<void> => {
      const storageProducts = localStorage.getItem('@HiagoFood:products');

      if (storageProducts) {
        setProducts(JSON.parse(storageProducts));
      }
    };

    loadProducts();
  }, []);

  const addToCart = useCallback(
    (product) => {
      const productExists = products.some((p) => p.id === product.id);

      if (productExists) {
        const newProducts = products.map((p) =>
          p.id === product.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );

        setProducts(newProducts);

        localStorage.setItem(
          '@HiagoFood:products',
          JSON.stringify(newProducts)
        );
        return;
      }

      const newProduct: Product = { ...product, quantidade: 1 };

      setProducts([...products, newProduct]);

      localStorage.setItem(
        '@HiagoFood:products',
        JSON.stringify([...products, newProduct])
      );
    },
    [products]
  );

  const increment = useCallback(
    (id) => {
      const newProducts = products.map((p) =>
        p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p
      );

      setProducts(newProducts);

      localStorage.setItem('@HiagoFood:products', JSON.stringify(newProducts));
    },
    [products]
  );

  const decrement = useCallback(
    async (id) => {
      const newProducts = products.map((p) =>
        p.id === id ? { ...p, quantidade: p.quantidade - 1 } : p
      );

      const filterProducts = newProducts.filter(
        (p) => !(p.id === id && p.quantidade === 0)
      );

      setProducts(filterProducts);

      localStorage.setItem('@HiagoFood:products', JSON.stringify(newProducts));
    },
    [products]
  );

  const finalizate = useCallback(() => {
    setProducts([]);
    toast.success('Pedido finalizado com sucesso. Obrigado 🍔');
    history.push('/');
    localStorage.removeItem('@HiagoFood:products');
  }, [history]);

  const deleteItem = useCallback(
    (id: string) => {
      const newProducts = products.filter((p) => p.id !== id);
      setProducts(newProducts);
      localStorage.setItem('@HiagoFood:products', JSON.stringify(newProducts));
    },
    [products]
  );

  const value = React.useMemo(
    () => ({
      addToCart,
      increment,
      decrement,
      products,
      finalizate,
      deleteItem,
    }),
    [products, addToCart, increment, decrement, finalizate, deleteItem]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCart = (): CartContext => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
};

export { CartProvider, useCart };
