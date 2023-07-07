import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private API_URL = 'https://young-sands-07814.herokuapp.com/api/users';

  constructor(private http: HttpClient) {}

  public create(userDTO: UserDTO) {
    return this.http.post<User>(this.API_URL, userDTO);
  }

  public getAll() {
    return this.http.get<User[]>(this.API_URL);
  }
}
