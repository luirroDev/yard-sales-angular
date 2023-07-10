import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { Auth } from '../models/auth.model';
import { TokenService } from './token.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'https://damp-spire-59848.herokuapp.com/api/auth';
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  public login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.API_URL}/login`, { email, password })
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }

  public getProfile() {
    return this.http.get<User>(`${this.API_URL}/profile`).pipe(
      tap((user) => {
        this.user.next(user);
      })
    );
  }

  public loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.getProfile()));
  }

  public logout() {
    this.tokenService.removeToken();
  }
}
