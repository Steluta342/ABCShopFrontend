import { User } from './user.model';

export interface RoleRequestPayload {
  roleName: string;
  // opțional – dacă vrem să trimitem și userii care au rolul acesta
  users?: User[];
}
