import { User } from './user.model';
import { Address } from './address.model';
import { OrderLine } from './order-line.model';
import { Status } from './order-payload.model';

export interface Order {
  id: number;

  user: User;

  deliveryAddress: Address;
  userAddress?: Address;

  orderDate: string;    // LocalDateTime trimis ca string din backend

  status?: Status;      // 'NEW' | 'PROCESSING' | 'PROCESSED' | 'DELIVERED'

  orderLines: OrderLine[];
}
