import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className="p-2.5 rounded-lg bg-(--surface) dark:bg-gray-700 text-(--text-h) dark:text-white border border-(--border) dark:border-transparent hover:bg-(--bg) dark:hover:bg-gray-600 transition-colors shadow-(--shadow) dark:shadow-sm"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}