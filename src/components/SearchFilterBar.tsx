import type { Category } from "../types";

export type StockFilter = "all" | "in-stock" | "out-of-stock";

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  stockFilter: StockFilter;
  onStockFilterChange: (v: StockFilter) => void;
  categories: Category[];
}

export default function SearchFilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  stockFilter,
  onStockFilterChange,
  categories,
}: SearchFilterBarProps) {
  const fieldStyles =
    "bg-(--surface) dark:bg-gray-900 border border-(--border) dark:border-gray-600 rounded-lg px-3 py-2 text-(--text-h) dark:text-gray-100 focus:ring-2 focus:ring-(--accent) focus:border-(--accent) transition-colors duration-200 outline-none";

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name or SKU"
        className={`flex-1 ${fieldStyles}`}
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className={fieldStyles}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <select
        value={stockFilter}
        onChange={(e) => onStockFilterChange(e.target.value as StockFilter)}
        className={fieldStyles}
      >
        <option value="all">All Stock</option>
        <option value="in-stock">In Stock</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>
    </div>
  );
}