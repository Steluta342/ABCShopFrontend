import {Product} from './product.model';

export interface OrderLine {
  id?: number;
  quantity: number;
  product: Product;   // în Response poți primi un "ProductResponse"
  // pentru CreateRequest, de obicei trimiți doar productId:
  productId?: number;
}
