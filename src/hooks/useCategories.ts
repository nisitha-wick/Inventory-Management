import type { Category } from "../types";
import { v4 as uuidv4 } from "uuid";
import { KEYS } from "../utils/storage";
import { useLocalStorage } from "./useLocalStorage";

const DEFAULT_CATEGORIES: Category[] = [
  { id: uuidv4(), name: "Uncategorized" },
];

export function useCategories() {
  const [categories, setCategories] = useLocalStorage<Category[]>(
    KEYS.CATEGORIES,
    DEFAULT_CATEGORIES,
  );

  const addCategory = (name: string) => {
    if (categories.some((c) => c.name.toLowerCase() === name.toLowerCase()))
      return;
    setCategories((prev) => [...prev, { id: uuidv4(), name }]);
  };

  const removeCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return { categories, addCategory, removeCategory };
}
