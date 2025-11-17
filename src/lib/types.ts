export interface Company {
  id: number;
  name: string;
  description: string;
  industry: string;
  location: string;
  employees: number;
  founded: number;
  revenue: number;
}

export type SortBy = 'name' | 'employees' | 'founded';
