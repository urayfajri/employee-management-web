import { Injectable, signal } from '@angular/core';
import { EmployeeDTO } from '../../../core/dto/employee/employee.dto';

@Injectable({ providedIn: 'root' })
export class EmployeeStateService {
  searchUsername = signal<string>('');
  searchGroup = signal<string>('');

  selectedEmployee = signal<EmployeeDTO | null>(null);

  setSearch(username: string, group: string) {
    this.searchUsername.set(username);
    this.searchGroup.set(group);
  }

  setSelectedEmployee(emp: EmployeeDTO | null) {
    this.selectedEmployee.set(emp);
  }
}
