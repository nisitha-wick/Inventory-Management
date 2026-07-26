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
      <div className="w-full bg-(--surface) dark:bg-gray-800 rounded-xl shadow-(--shadow) dark:shadow-lg border border-(--border) dark:border-gray-700 p-8 sm:p-12 text-center">
        <p className="text-(--text) dark:text-gray-400 font-medium text-base sm:text-lg">
          No products found.
        </p>
        <p className="text-sm text-(--text) opacity-70 dark:text-gray-500 mt-2">
          Try adjusting the filters or click "Add Product" to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-(--surface) dark:bg-gray-800 rounded-xl shadow-(--shadow) dark:shadow-lg border border-(--border) dark:border-gray-700 overflow-hidden">
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-(--text) dark:text-gray-400 uppercase tracking-wider bg-(--bg) dark:bg-gray-900/50 border-b border-(--border) dark:border-gray-700">
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
          <tbody className="divide-y divide-(--border) dark:divide-gray-700">
            {products.map((p) => (
              <tr
                key={p.id}
                className="hover:bg-(--bg) dark:hover:bg-gray-700/50 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-medium text-(--text-h) dark:text-white">
                  {p.name}
                </td>
                <td className="px-6 py-4 text-(--text) dark:text-gray-400 font-mono text-xs">
                  {p.sku}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-(--code-bg) dark:bg-gray-700 text-(--text) dark:text-gray-300 text-xs font-medium">
                    {p.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-(--text-h) dark:text-gray-300 font-medium">
                  ${p.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-(--text-h) dark:text-gray-300">
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
                      className="px-3 py-1.5 rounded-md text-xs font-medium text-(--accent) hover:bg-(--accent-bg) dark:text-blue-400 dark:hover:bg-blue-900/30 transition-colors"
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

      <div className="sm:hidden divide-y divide-(--border) dark:divide-gray-700">
        {products.map((p) => (
          <div key={p.id} className="p-4">
            <div className="flex justify-between items-start gap-2 mb-1.5">
              <p className="font-medium text-(--text-h) dark:text-white">
                {p.name}
              </p>
              <span
                className={`shrink-0 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                  p.stock > 0
                    ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                }`}
              >
                {p.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-(--text) dark:text-gray-400">
                {p.sku}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-(--code-bg) dark:bg-gray-700 text-(--text) dark:text-gray-300 text-xs font-medium">
                {p.category}
              </span>
            </div>

            <div className="flex justify-between text-sm text-(--text-h) dark:text-gray-300 mb-3">
              <span className="font-medium">${p.price.toFixed(2)}</span>
              <span>Stock: {p.stock}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onAdjustStock(p)}
                className="flex-1 px-3 py-2 rounded-md text-xs font-medium text-(--accent) bg-(--accent-bg) dark:text-blue-400 dark:bg-blue-900/30 transition-colors"
              >
                Stock
              </button>
              <button
                onClick={() => onEdit(p)}
                className="flex-1 px-3 py-2 rounded-md text-xs font-medium text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/30 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="flex-1 px-3 py-2 rounded-md text-xs font-medium text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/30 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}