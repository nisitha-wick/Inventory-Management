import { useState } from "react";
import ProductForm from "./components/ProductForm";
import { useCategories } from "./hooks/useCategories";
import { useProducts } from "./hooks/useProducts";
import type { Product } from "./types";
import ProductTable from "./components/ProductTable";
import Dashboard from "./components/Dashboard";

export default function App() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { categories, addCategory } = useCategories();
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <button
          onClick={() => {
            setEditingProduct(undefined);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      <Dashboard products={products} categories={categories} />

      <div className="bg-white rounded-lg shadow">
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

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
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
          </div>
        </div>
      )}
    </div>
  );
}
