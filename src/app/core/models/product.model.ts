export interface Product {
  id?: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;      // sau CategoryService, dacă backend-ul returnează obiect
  // createdAt?: string;  // dacă există în Response
}
