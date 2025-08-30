import { Component, inject, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DummyEmployees, EmployeeDTO } from '../../../core/dto/employee/employee.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmployeeStateService } from '../state/employee-state.service';

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
  private state = inject(EmployeeStateService);

  displayedColumns = ['username', 'firstName', 'lastName', 'email', 'status', 'group', 'actions'];
  dataSource = new MatTableDataSource<EmployeeDTO>(DummyEmployees);

  searchUsername = '';
  searchGroup = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.searchUsername = this.state.searchUsername();
    this.searchGroup = this.state.searchGroup();

    if (this.searchUsername || this.searchGroup) {
      this.search();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search() {
    //state
    this.state.setSearch(this.searchUsername, this.searchGroup);
    console.log(this.searchUsername, this.searchGroup);

    this.dataSource.data = DummyEmployees.filter(
      (emp) =>
        emp.username.toLowerCase().includes(this.searchUsername.toLowerCase()) &&
        emp.group.toLowerCase().includes(this.searchGroup.toLowerCase())
    );
    if (this.paginator) {
      this.paginator.firstPage();
    }
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
    this.state.setSelectedEmployee(emp);
    this.router.navigate(['/employees/detail']);
  }
}
