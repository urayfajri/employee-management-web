import { Component, inject, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DummyEmployees, EmployeeDTO } from '../../../core/dto/employee/employee.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  displayedColumns = ['username', 'firstName', 'lastName', 'email', 'status', 'group', 'actions'];
  dataSource = new MatTableDataSource<EmployeeDTO>(DummyEmployees);

  searchUsername = '';
  searchGroup = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search() {
    this.dataSource.data = DummyEmployees.filter(
      (emp) =>
        emp.username.toLowerCase().includes(this.searchUsername.toLowerCase()) &&
        emp.group.toLowerCase().includes(this.searchGroup.toLowerCase())
    );
    this.paginator.firstPage(); // reset ke page 1 setelah search
  }

  addEmployee() {
    this.router.navigate(['/employees/add']);
  }

  editEmployee(emp: EmployeeDTO) {
    this.snackBar.open(`Edit ${emp.username}`, 'Close', {
      duration: 2000,
      panelClass: ['edit-snackbar'],
    });
  }

  deleteEmployee(emp: EmployeeDTO) {
    this.snackBar.open(`Delete ${emp.username}`, 'Close', {
      duration: 2000,
      panelClass: ['delete-snackbar'],
    });
  }

  viewDetail(emp: EmployeeDTO) {
    this.router.navigate(['/employees/detail', emp.username]);
  }
}
