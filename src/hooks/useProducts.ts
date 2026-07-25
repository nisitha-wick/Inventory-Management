import type { Product, StockHistoryEntry } from "../types";
import { KEYS } from "../utils/storage";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidv4 } from "uuid";

export function useProducts() {
  const [products, setProducts] = useLocalStorage<Product[]>(KEYS.PRODUCTS, []);
  const [history, setHistory] = useLocalStorage<StockHistoryEntry[]>(
    KEYS.HISTORY,
    [],
  );

  const addProduct = (
    data: Omit<Product, "id" | "createdAt" | "updatedAt">,
  ) => {
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...data,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, ...data, updatedAt: new Date().toISOString() }
          : p,
      ),
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const adjustStock = (
    id: string,
    change: number,
    reason: StockHistoryEntry["reason"],
  ) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    const newStock = product.stock + change;
    if (newStock < 0) {
      throw new Error("Stock cannot exist below zero.");
    }

    updateProduct(id, { stock: newStock });

    const entry: StockHistoryEntry = {
      id: uuidv4(),
      productId: id,
      productName: product.name,
      change,
      reason,
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [entry, ...prev]);
  };

  return {
    products,
    history,
    addProduct,
    updateProduct,
    deleteProduct,
    adjustStock,
  };
}
