import type { Product } from "../types";

interface ProductTableProps {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
  onAdjustStock: (p: Product) => void;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  onAdjustStock,
}: ProductTableProps) {
  if (!products || products.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border-gray-100 dark:border-gray-700 p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
          No products found.
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Try adjusting the filters or click "Add Product" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold text-center">SKU</th>
              <th className="px-6 py-4 font-semibold text-center">Category</th>
              <th className="px-6 py-4 font-semibold text-center">Price</th>
              <th className="px-6 py-4 font-semibold text-center">Stock</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
              <th className="px-6 py-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {products.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-gray-50/80 dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {p.name}
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-xs">
                  {p.sku}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium">
                    {p.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300 font-medium">
                  ${p.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {p.stock}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      p.stock > 0
                        ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                    }`}
                  >
                    {p.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onAdjustStock(p)}
                      className="px-3 py-1.5 rounded-md text-xs font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      Stock
                    </button>
                    <button
                      onClick={() => onEdit(p)}
                      className="px-3 py-1.5 rounded-md text-xs font-medium text-amber-600 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-900/30 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(p.id)}
                      className="px-3 py-1.5 rounded-md text-xs font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
