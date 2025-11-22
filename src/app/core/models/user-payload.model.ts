import { Role } from './role.model';
import { Address } from './address.model';

/**
 * Corespunde lui RegisterRequest din backend
 * (folosit la POST /api/users)
 */
export interface RegisterRequestPayload {
  username: string;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  password: string;
  messageChannel?: string;
  addresses?: Address[];   // putem trimite [] sau să-l omitem dacă nu avem adrese
}

/**
 * Corespunde lui UserRequest din backend
 * (folosit la PUT /api/users/{id})
 */
export interface UserRequestPayload {
  username: string;
  firstName: string;
  lastName: string;
  city: string;
  email: string;
  password?: string;       // opțional la edit
  messageChannel?: string;
  roles?: Role[];          // lista de roluri (RoleResponse)
  addresses?: Address[];   // dacă vom folosi și adresele la edit
}
