
export type Status = 'NEW' | 'PROCESSING' | 'PROCESSED' | 'DELIVERED';

export interface IdOnly {
  id: number;
}

export interface OrderLinePayload {
  quantity: number;
  // !! numele câmpului trebuie să fie EXACT "product"
  product: IdOnly;
  // "order" e ignorat de server (@JsonIgnore) -> nu îl trimitem
}

export interface OrderRequestPayload {
  user: IdOnly;                 // UserResponse "slab" cu doar id
  deliveryAddress: IdOnly;      // AddressResponse "slab" cu doar id
  userAddress?: IdOnly;         // opțional dacă vreau să trimit și adresa userului
  orderDate: string;            // ISO local (fără "Z"), pt LocalDateTime
  orderLines: OrderLinePayload[];
  status?: Status;              // ex: 'NEW'
}

function nowLocalIso(): string {
  // "YYYY-MM-DDTHH:mm:ss" (fără zecimi, fără Z)
  return new Date().toISOString().slice(0, 19);
}

