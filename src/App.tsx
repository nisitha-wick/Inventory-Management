import { useState } from "react";
import ProductForm from "./components/ProductForm";
import { useCategories } from "./hooks/useCategories";
import { useProducts } from "./hooks/useProducts";
import type { Product } from "./types";

export default function App() {
  const { products, addProduct, updateProduct } = useProducts();
  const { categories, addCategory } = useCategories();
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [showForm, setShowForm] = useState(false);

  return (
    <ProductForm
      categories={categories}
      initialData={editingProduct}
      onSubmit={(data) => {
        if (editingProduct) updateProduct(editingProduct.id, data);
        else addProduct(data);
        setShowForm(false);
      }}
      onCancel={() => setShowForm(false)}
    />
  );
}
