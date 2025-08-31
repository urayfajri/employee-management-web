import { Injectable } from '@angular/core';
import { DummyEmployees, EmployeeDTO } from '../../dto/employee/employee.dto';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService {
  private employees: EmployeeDTO[] = DummyEmployees;

  // simulate API delay
  private delay<T>(data: T, ms = 600): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(data), ms));
  }

  getEmployees(): Promise<EmployeeDTO[]> {
    return this.delay(this.employees);
  }

  getEmployeeById(id: number): Promise<EmployeeDTO | undefined> {
    const emp = this.employees.find((e) => e.id === id);
    return this.delay(emp);
  }

  addEmployee(newEmp: EmployeeDTO): Promise<EmployeeDTO> {
    const id = Math.max(...this.employees.map((e) => e.id), 0) + 1;
    const empWithId = { ...newEmp, id };
    this.employees.splice(0, 0, empWithId);
    return this.delay(empWithId);
  }

  updateEmployee(updated: EmployeeDTO): Promise<EmployeeDTO | null> {
    const index = this.employees.findIndex((e) => e.id === updated.id);
    if (index !== -1) {
      this.employees[index] = updated;
      return this.delay(updated);
    }
    return this.delay(null);
  }

  deleteEmployee(id: number): Promise<boolean> {
    const index = this.employees.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
      return this.delay(true);
    }
    return this.delay(false);
  }
}
