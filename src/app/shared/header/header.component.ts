import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { UserDTO } from 'src/app/cores/dtos/user.dto';
import { AuthService } from 'src/app/cores/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly _onDestroy$: Subject<void> = new Subject<void>();

  currentUser: UserDTO | undefined;

  constructor(
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.authService.currentUser.subscribe((user) => {
      if (user.id !== 0) {
        this.currentUser = user;
      }
    });
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
