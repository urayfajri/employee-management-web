import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, fromEvent, merge, Subscription, switchMap, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private timeoutMinutes = 1; // auto logout after 1 minutes of inactivity
  private sessionSub?: Subscription;

  // signal to track login status
  _isLoggedIn = signal(false);

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Hardcode login validation
    if (username === 'admin' && password === '1234') {
      this._isLoggedIn.set(true);
      this.router.navigate(['/employees']);
      this.startIdleTimer();
      return true;
    }
    return false;
  }

  logout() {
    this._isLoggedIn.set(false);
    this.stopIdleTimer();
    this.router.navigate(['/login']);
  }

  // Mulai idle timer
  private startIdleTimer() {
    this.stopIdleTimer(); // pastikan tidak ada timer lama

    // listen semua aktivitas user: click, keydown, scroll, mousemove
    const activity$ = merge(
      fromEvent(document, 'click'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'scroll'),
      fromEvent(document, 'mousemove')
    );

    this.sessionSub = activity$
      .pipe(
        // jika user tidak aktif selama timeoutMs, timer akan jalan
        debounceTime(0), // reset timer segera setelah ada aktivitas
        switchMap(() => timer(this.timeoutMinutes * 60 * 1000)) // buat timer baru saat idle
      )
      .subscribe(() => {
        alert('Session expired due to inactivity!');
        this.logout();
      });
  }

  private stopIdleTimer() {
    this.sessionSub?.unsubscribe();
    this.sessionSub = undefined;
  }
}
