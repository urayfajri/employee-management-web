import { Component, inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);

  username = '';
  password = '';
  errorMessage = '';

  onLogin() {
    if (this.username === '' && this.password === '') {
      this.errorMessage = 'Username and password are required';
      return;
    }
    if (this.username === '') {
      this.errorMessage = 'Username is required';
      return;
    }
    if (this.password === '') {
      this.errorMessage = 'Password is required';
      return;
    }

    const success = this.authService.login(this.username, this.password);
    if (!success) {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
