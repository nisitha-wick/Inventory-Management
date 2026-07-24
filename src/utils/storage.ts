const KEYS = {
  PRODUCTS: "inv_products",
  CATEGORIES: "inv_categories",
  HISTORY: "inv_stock_history",
  THEME: "inv_theme",
} as const;

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    console.error(`Failed to parse localStorage key: ${key}`);
    return fallback;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error(`Failed to save localStorage key: ${key}`);
  }
}

export {KEYS};
