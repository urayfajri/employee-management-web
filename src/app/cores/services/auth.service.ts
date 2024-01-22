import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { UserDTO, userDefault } from '../dtos/user.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalEnum } from '../enums/local.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<UserDTO>;
  public currentUser: Observable<UserDTO>;

  constructor(private readonly http: HttpClient) {
    let userInfo = localStorage.getItem(LocalEnum.USER_INFO);
    const jsonParse: UserDTO =
      userInfo !== null ? JSON.parse(userInfo) : userDefault;
    this.currentUserSubject = new BehaviorSubject<UserDTO>(jsonParse);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserDTO {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`/users/authenticate`, { username, password })
      .pipe(
        map((user) => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(LocalEnum.USER_INFO, JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(LocalEnum.USER_INFO);
    this.currentUserSubject.next(userDefault);
  }
}
