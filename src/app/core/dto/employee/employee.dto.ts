export interface EmployeeDTO {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

// Optional: untuk dummy data / initial data
export const DummyEmployees: EmployeeDTO[] = Array.from({ length: 100 }).map((_, i) => ({
  username: `user${i}`,
  firstName: `First${i}`,
  lastName: `Last${i}`,
  email: `user${i}@example.com`,
  birthDate: new Date(1990, i % 12, (i % 28) + 1),
  basicSalary: 3000 + i * 50,
  status: i % 2 === 0 ? 'Active' : 'Inactive',
  group: `Group ${i % 10}`,
  description: `Description ${i}`,
}));
