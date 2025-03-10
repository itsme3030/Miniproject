export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  joinDate: string;
  status: 'active' | 'inactive';
  imageUrl?: string;
}