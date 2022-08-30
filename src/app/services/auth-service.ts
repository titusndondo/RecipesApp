import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { tap } from 'rxjs/operators';

export interface AuthResponseData {
  username?: string,
  email: string,
  localId: string,
  token: string,
  expiresIn: string,
  registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new Subject();
  current_user;
  

  baseURL: string = 'http://127.0.0.1:5000/'

  constructor(
    private httpClient: HttpClient
  ) {};

  createUser(userData: {username: string, email: string, password: string}) {
    return this.httpClient.post<AuthResponseData>(
      `${this.baseURL}signup`,
      userData
    )
  };

  login(userData: {username: string, email: string, password: string}) {

    return this.httpClient.post(
      `${this.baseURL}login`,
      userData
    )
    .pipe(tap((response: AuthResponseData) => {
      
      // console.log(response, user);
      this.user.next(response);
      this.current_user = response;
    }))
  }
}