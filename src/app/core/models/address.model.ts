export interface Address {
  id?: number;
  name: string;      // numele adresei (ex: „Acasă”, „Serviciu”)
  country: string;
  city: string;
  street: string;
  zipCode: string;
  userId?: number; // preferabil id, nu tot obiectul
}
