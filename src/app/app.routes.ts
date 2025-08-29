import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('./features/employees/employees.routes').then((m) => m.EMPLOYEE_ROUTES),
    canActivate: [authGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
