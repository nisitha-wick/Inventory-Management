import { useMemo, useState } from "react";
import ProductForm from "./components/ProductForm";
import { useCategories } from "./hooks/useCategories";
import { useProducts } from "./hooks/useProducts";
import type { Product, StockFilter } from "./types";
import ProductTable from "./components/ProductTable";
import Dashboard from "./components/Dashboard";
import CategoryManager from "./components/CategoryManager";
import StockAdjustModal from "./components/StockAdjustModal";
import { X } from "lucide-react";
import SearchFilterBar from "./components/SearchFilterBar";
import { exportProductsToCSV } from "./utils/csv";
import { useTheme } from "./hooks/useTheme";
import ThemeToggle from "./components/ThemeToggle";

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

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");

  const { isDark, toggleTheme } = useTheme();

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !categoryFilter || p.category === categoryFilter;
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in-stock" && p.stock > 0) ||
        (stockFilter === "out-of-stock" && p.stock === 0);
      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, search, categoryFilter, stockFilter]);

  return (
    <div className="min-h-screen bg-(--bg) dark:bg-gray-900 text-(--text) dark:text-gray-100 transition-colors">
      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-(--text-h) dark:text-white">
            Inventory Management
          </h1>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-2 mb-6">
          <button
            onClick={() => exportProductsToCSV(filteredProducts)}
            className="w-full sm:w-auto bg-(--surface) dark:bg-gray-700 text-(--text-h) dark:text-white border border-(--border) dark:border-transparent px-4 py-2.5 rounded-lg font-medium hover:bg-(--bg) dark:hover:bg-gray-600 transition-colors shadow-(--shadow) dark:shadow-sm text-sm sm:text-base whitespace-nowrap"
          >
            Export CSV
          </button>
          <button
            onClick={() => setShowCategories(true)}
            className="w-full sm:w-auto bg-(--surface) dark:bg-gray-700 text-(--text-h) dark:text-white border border-(--border) dark:border-transparent px-4 sm:px-5 py-2.5 rounded-lg font-medium hover:bg-(--bg) dark:hover:bg-gray-600 transition-colors shadow-(--shadow) dark:shadow-sm text-sm sm:text-base whitespace-nowrap"
          >
            Manage Categories
          </button>
          <button
            onClick={() => {
              setEditingProduct(undefined);
              setShowForm(true);
            }}
            className="w-full sm:w-auto bg-(--accent) text-white px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm sm:text-base whitespace-nowrap"
          >
            + Add Product
          </button>
        </div>

        <Dashboard products={products} categories={categories} />

        <SearchFilterBar
          search={search}
          onSearchChange={setSearch}
          category={categoryFilter}
          onCategoryChange={setCategoryFilter}
          stockFilter={stockFilter}
          onStockFilterChange={setStockFilter}
          categories={categories}
        />

        <ProductTable
          products={filteredProducts}
          onEdit={(p) => {
            setEditingProduct(p);
            setShowForm(true);
          }}
          onDelete={deleteProduct}
          onAdjustStock={setStockModalProduct}
        />

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
            <div className="w-full max-w-md max-h-[90vh] overflow-y-auto">
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
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setShowCategories(false)}
                className="absolute top-4 right-4 z-10 text-(--text) hover:text-(--text-h) dark:hover:text-gray-200 transition-colors bg-(--bg) dark:bg-gray-700 rounded-full p-1.5 shadow-sm"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <CategoryManager categories={categories} onAdd={addCategory} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}