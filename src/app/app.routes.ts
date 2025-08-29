import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./features/employees/employees.routes').then((m) => m.EMPLOYEE_ROUTES),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
