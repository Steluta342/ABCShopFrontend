import {Product} from './product.model';

export interface Order {
  id?: number;
  quantity: number;
  product: Product;   // în Response potem primi un "ProductResponse"
  // pentru CreateRequest, de obicei se trimite doar productId:
  productId?: number;
}
