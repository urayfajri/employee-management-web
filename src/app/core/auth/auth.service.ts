import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = signal(false);
  isLoggedIn = computed(() => this._isLoggedIn());

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Hardcode login validation
    if (username === 'admin' && password === '1234') {
      this._isLoggedIn.set(true);
      this.router.navigate(['/employees']);
      return true;
    }
    return false;
  }

  logout() {
    this._isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
