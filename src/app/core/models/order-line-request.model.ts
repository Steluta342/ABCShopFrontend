import { IdOnly } from './order-payload.model';

// ProductResponse are cel puțin un "id"
export interface ProductNameDto {
  id: number;
}

// OrderResponse minimal: doar ID-ul este necesar pentru update
export interface OrderDto {
  id: number;
}

export interface OrderLineRequestPayload {
  quantity: number;
  productName: ProductNameDto;     // EXACT ca în OrderLineRequest din backend
  order?: OrderDto;                // opțional
}
