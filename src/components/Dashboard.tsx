import type { Category, Product } from "../types";

interface DashboardProps {
  products: Product[];
  categories: Category[];
}

export default function Dashboard({ products, categories }: DashboardProps) {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const outOfStock = products.filter((p) => p.stock === 0).length;

  const countByCategory = categories.map((c) => ({
    name: c.name,
    count: products.filter((p) => p.category === c.name).length,
  }));

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      valueColor: "text-gray-900 dark:text-white",
    },
    {
      label: "Inventory Value",
      value: `$${totalValue.toFixed(2)}`,
      valueColor: "text-green-600 dark:text-green-400",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      valueColor:
        outOfStock > 0
          ? "text-red-600 dark:text-red-400"
          : "text-gray-900 dark:text-white",
    },
  ];

  return (
    <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 flex flex-col justify-center"
          >
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 sm:mb-2">
              {s.label}
            </p>
            <p
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${s.valueColor}`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 sm:mb-4">
          Products per Category
        </h3>
        {countByCategory.length > 0 ? (
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {countByCategory.map((c) => (
              <div
                key={c.name}
                className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-full transition-colors"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {c.name}
                </span>
                <span className="flex items-center justify-center bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 text-xs font-bold px-2 py-0.5 rounded-full">
                  {c.count}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No categories available.
          </p>
        )}
      </div>
    </div>
  );
}
