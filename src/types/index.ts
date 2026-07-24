export interface Product {
    id: string;
    sku: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    createdAt: string;
    updatedAt: string;
}

export interface StockHistoryEntry {
    id: string;
    productId: string;
    productName: string;
    change: number 
    reason: 'restock' | 'sale' | 'adjustment';
    timestamp: string;
}

export interface Category {
    id: string;
    name: string;
}

export type StockFilter = 'all' | 'in-stock' | 'out-of-stock';