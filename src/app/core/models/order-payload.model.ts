// src/app/core/models/order-payload.model.ts

export type Status = 'NEW' | 'PROCESSING' | 'PROCESSED' | 'DELIVERED';

export interface IdOnly {
  id: number;
}

export interface OrderLinePayload {
  quantity: number;
  // numele câmpului trebuie să fie EXACT "product"
  product: { id: number };
}

// AICI trimitem doar datele necesare pentru crearea comenzii.
// totalPrice NU se trimite, este calculat în backend.
export interface OrderRequestPayload {
  userId: number;
  deliveryAddressId: number;
  userAddressId?: number | null;
  orderDate: string;            // ISO pt LocalDateTime
  orderLines: OrderLinePayload[];
  status: string;
}

export function nowLocalIso(): string {
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
