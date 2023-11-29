// product.model.ts

export interface Product {
  createdAt: string;
  title: string;
  cost: number;
  price: number;
  id: string;
  quantitySold: number; // Añadido para estadísticas de ventas
}
