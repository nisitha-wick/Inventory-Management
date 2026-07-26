import type { Product } from "../types";

export function exportProductsToCSV(products: Product[]) {
  if (products.length === 0) return;

  const headers = ["Name", "SKU", "Category", "Price", "Stock"];

  const escapeCell = (value: string | number) => {
    const str = String(value);
    if (/[",\n]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = products.map((p) => [
    escapeCell(p.name),
    escapeCell(p.sku),
    escapeCell(p.category),
    p.price.toFixed(2),
    p.stock,
  ]);

  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `inventory-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
