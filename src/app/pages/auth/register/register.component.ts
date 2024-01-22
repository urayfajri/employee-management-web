import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject, first } from 'rxjs';
import { AuthService } from 'src/app/cores/services/auth.service';
import { UserService } from 'src/app/cores/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  form: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  returnUrl: string = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    this.form = this.formBuilder.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnInit(): void {
    // redirect to home if already logged in
    if (this.authService.currentUserValue.id !== 0) {
      this.router.navigate(['/']);
    }
  }
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  // convenience getter for easy access to form fields

  get firstName() {
    return this.form.get('firstName');
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      this.toastr.error('All fields must be filled', 'Error');
      return;
    }

    this.loading = true;
    this.userService
      .register(this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.toastr.success('Register Success');
          this.router.navigate(['/auth']);
        },
        (error) => {
          this.toastr.error(error);
          this.loading = false;
        }
      );
  }
}
