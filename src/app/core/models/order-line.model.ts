import {Product} from './product.model';

export interface OrderLine {
  id?: number;
  quantity: number;
  product: Product;   // în Response putem primi un "ProductResponse"
  // pentru CreateRequest, de obicei se trimite doar productId:
  productId?: number;
}
