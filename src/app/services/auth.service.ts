import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { Auth } from '../models/auth.model';
import { TokenService } from './token.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'https://young-sands-07814.herokuapp.com/api/auth';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private login(email: string, password: string) {
    return this.http
      .post<Auth>(`${this.API_URL}/login`, { email, password })
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }

  private getProfile() {
    return this.http.get<User>(`${this.API_URL}/profile`);
  }

  public loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.getProfile()));
  }
}
