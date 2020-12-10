import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

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
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const storageProducts = await localStorage.getItem('@GoMP:products');

      if (storageProducts) {
        setProducts(JSON.parse(storageProducts));
      }
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async product => {
      const productExists = products.some(p => p.id === product.id);

      if (productExists) {
        const newProducts = products.map(p =>
          p.id === product.id ? { ...p, quantidade: p.quantidade + 1 } : p,
        );

        setProducts(newProducts);

        await localStorage.setItem(
          '@GoMP:products',
          JSON.stringify(newProducts),
        );
        return;
      }

      const newProduct: Product = { ...product, quantidade: 1 };

      setProducts([...products, newProduct]);

      await localStorage.setItem(
        '@GoMP:products',
        JSON.stringify([...products, newProduct]),
      );
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const newProducts = products.map(p =>
        p.id === id ? { ...p, quantidade: p.quantidade + 1 } : p,
      );

      setProducts(newProducts);

      await localStorage.setItem('@GoMP:products', JSON.stringify(newProducts));
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const newProducts = products.map(p =>
        p.id === id ? { ...p, quantidade: p.quantidade - 1 } : p,
      );

      const filterProducts = newProducts.filter(
        p => !(p.id === id && p.quantidade === 0),
      );

      setProducts(filterProducts);

      await localStorage.setItem('@GoMP:products', JSON.stringify(newProducts));
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
