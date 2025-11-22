import { Product } from './product.model';

export interface OrderLine {
  id?: number;          // dacă vrem să aflam id-ul liniei (backend poate să îl returneze)
  quantity: number;
  product: Product;     // backend: OrderLineResponse.product
}
