import { useState } from "react";
import ProductForm from "./components/ProductForm";
import { useCategories } from "./hooks/useCategories";
import { useProducts } from "./hooks/useProducts";
import type { Product } from "./types";
import ProductTable from "./components/ProductTable";

export default function App() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { categories, addCategory } = useCategories();
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
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
      <ProductTable
        products={products}
        onEdit={(p) => {
          setEditingProduct(p);
          setShowForm(true);
        }}
        onDelete={deleteProduct}
        onAdjustStock={() => console.log("Not built yet")}
      />
    </div>
  );
}
