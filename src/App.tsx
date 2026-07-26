import { useState } from "react";
import ProductForm from "./components/ProductForm";
import { useCategories } from "./hooks/useCategories";
import { useProducts } from "./hooks/useProducts";
import type { Product } from "./types";
import ProductTable from "./components/ProductTable";
import Dashboard from "./components/Dashboard";
import CategoryManager from "./components/CategoryManager";
import StockAdjustModal from "./components/StockAdjustModal";
import { X } from "lucide-react";

export default function App() {
  const { products, addProduct, updateProduct, deleteProduct, adjustStock } =
    useProducts();
  const { categories, addCategory } = useCategories();
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [showForm, setShowForm] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [stockModalProduct, setStockModalProduct] = useState<
    Product | undefined
  >();

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => setShowCategories(true)}
            className="flex-1 sm:flex-none bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm"
          >
            Manage Categories
          </button>
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
          onAdjustStock={setStockModalProduct}
        />
      </div>

      {stockModalProduct && (
        <StockAdjustModal
          product={stockModalProduct}
          onAdjust={(change, reason) =>
            adjustStock(stockModalProduct.id, change, reason)
          }
          onClose={() => setStockModalProduct(undefined)}
        />
      )}

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

      {showCategories && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg relative">
            <button
              onClick={() => setShowCategories(false)}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors bg-gray-100 dark:bg-gray-700 rounded-full p-1.5 shadow-sm"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <CategoryManager categories={categories} onAdd={addCategory} />
          </div>
        </div>
      )}
    </div>
  );
}
