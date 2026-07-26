# Inventory Management System

A frontend-only inventory management app built with React, TypeScript, Formik, Yup, and Tailwind CSS. All data persists in the browser via localStorage — no backend or database required.

## How to Run Locally

```bash
git clone <your-repo-url>
cd inventory-management
npm install
npm run dev
```

## Features Implemented

**Product Management**
- Add, edit, and delete products
- Fields: name, SKU, category, price, stock quantity

**Stock Management**
- Restock (increase) or record a sale (decrease)
- Validation prevents stock from going below zero

**Dashboard**
- Total products, total inventory value, out-of-stock count
- Product count per category

**Categories**
- Create custom categories
- Filter products by category

**Search & Filter**
- Search by product name or SKU
- Filter by category and stock status (In Stock / Out of Stock)

**Bonus Features**
- Auto-generated SKU (e.g. `PRD482910`)
- CSV export of the current product list
- Dark mode toggle, saved in localStorage
- Fully responsive layout (mobile card view / desktop table view)

**Tech Stack**
React · TypeScript · Formik · Yup · Tailwind CSS · Vite
