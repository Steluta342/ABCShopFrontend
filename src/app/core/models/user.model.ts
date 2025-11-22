import { Role } from './role.model';

export interface User {
  id?: number;
  username: string;
  email: string;

  // câmpuri opționale, există în UserResponse din backend
  firstName?: string;
  lastName?: string;
  city?: string;
  messageChannel?: string;

  // roluri complete (din RoleResponse)
  roles?: Role[];

  // pentru compatibilitate cu vechiul cod (dacă foloseam doar un string)
  role?: string;
}
