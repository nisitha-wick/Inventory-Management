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
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name or SKU..."
        className="flex-1 border rounded px-3 py-2"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border rounded px-3 py-2"
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
        className="border rounded px-3 py-2"
      >
        <option value="all">All Stock</option>
        <option value="in-stock">In Stock</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>
    </div>
  );
}