export type Status = 'NEW' | 'PROCESSING' | 'PROCESSED' | 'DELIVERED';

export interface IdOnly {
  id: number;
}

export interface OrderLinePayload {
  quantity: number;
  // !! numele câmpului trebuie să fie EXACT "product"
  product: IdOnly;
}

export interface OrderRequestPayload {
  user: IdOnly;
  deliveryAddress: IdOnly;
  userAddress?: IdOnly;
  orderDate: string;            // ISO pt LocalDateTime
  orderLines: OrderLinePayload[];
  status?: Status;
}
export function nowLocalIso(): string {
  // dată și oră LOCALĂ "YYYY-MM-DDTHH:mm:ss"
  const d = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');

  const year   = d.getFullYear();
  const month  = pad(d.getMonth() + 1);
  const day    = pad(d.getDate());
  const hour   = pad(d.getHours());
  const minute = pad(d.getMinutes());
  const second = pad(d.getSeconds());

  return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
}
