import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../../cores/services/local-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  form: FormGroup;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly formBuilder: FormBuilder,
    private readonly toastr: ToastrService
  ) {
    this.form = this.formBuilder.nonNullable.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.toastr.error('Username or password cannot be empty', 'Error');
      return;
    }

    this.toastr.success('berhasil', 'Login Success');
    this.form?.reset();
  }
}
