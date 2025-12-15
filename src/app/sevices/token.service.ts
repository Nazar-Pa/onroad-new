import { Injectable, signal } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public isAuthenticated = signal<boolean>(this.isTokenValid());

  isTokenNotValid(): boolean {
      return !this.isTokenValid();
  }

    isTokenValid() {
        const token = this.token;

        if(!token) {
            return false;
        }
        // decode the token
        const jwtHelper: JwtHelperService = new JwtHelperService();
        // check expiry date
        const isTokenExpired = jwtHelper.isTokenExpired(token);
        if (isTokenExpired) {
            localStorage.removeItem('token');
            return false;
        }
        return true;
    }

  constructor() { }

  set token(token: string) {
    this.isAuthenticated.set(true);
    localStorage.setItem('token', token);
  }

  get token() {
    return localStorage.getItem('token') as string
  }

  
  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
  }
}