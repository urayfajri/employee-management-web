import { Component, inject, signal } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeApiService } from '../../../core/services/employee/employee-api.service';
import { EmployeeDTO } from '../../../core/dto/employee/employee.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeStateService } from '../state/employee-state.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss',
})
export class EmployeeAddComponent {
  private fb = inject(FormBuilder);
  private api = inject(EmployeeApiService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private state = inject(EmployeeStateService);

  // state
  employee: EmployeeDTO | null = this.state.selectedEmployee();

  groups = signal<string[]>([
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Sales',
    'Finance',
    'HR',
    'Operations',
    'Support',
    'Legal',
  ]);

  statusOptions = signal<string[]>(['Active', 'Inactive']);
  filteredGroups = signal<string[]>(this.groups());
  filteredStatus = signal<string[]>(this.statusOptions());

  form: FormGroup = this.fb.group({
    username: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', [Validators.required, this.birthDateValidator]],
    basicSalary: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    status: ['', Validators.required],
    group: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor() {
    if (this.employee) {
      this.form.patchValue(this.employee);
    }
  }

  birthDateValidator(control: any) {
    if (!control.value) return null;
    const selected = new Date(control.value);
    const today = new Date();
    return selected > today ? { futureDate: true } : null;
  }

  filterGroups(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredGroups.set(this.groups().filter((g) => g.toLowerCase().includes(value)));
  }

  filterStatus(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredStatus.set(this.statusOptions().filter((s) => s.toLowerCase().includes(value)));
  }

  async save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const newEmployee: EmployeeDTO = this.form.value as EmployeeDTO;

    if (this.employee) {
      newEmployee.id = this.employee.id;
      const updatedEmployee: EmployeeDTO = newEmployee;
      this.api.updateEmployee(updatedEmployee).then(() => {
        this.router.navigate(['/employees']);
        this.snackBar.open(`Update ${newEmployee.username} Success`, 'Close', { duration: 2000 });
      });
    } else {
      this.api.addEmployee(newEmployee).then(() => {
        this.router.navigate(['/employees']);
        this.snackBar.open(`Add ${newEmployee.username} Success`, 'Close', { duration: 2000 });
      });
    }
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
