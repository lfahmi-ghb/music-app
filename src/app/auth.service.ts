import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import {User} from './User';
import {RegisterUser} from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient) { }

  getToken(): string{
    return localStorage.getItem('access_token');
  }

  readToken(): User{
    
    return helper.decodeToken(this.getToken());
  }

  isAuthenticated(): Boolean{
    if(this.getToken()){
      console.log('token exists');
      return true;
    }
    console.log('no token');
    return false;
  }
  login(user : User): Observable<any>{
    return this.http.post<any>(`${environment.userAPIBase}/login`, user)
  }

  logout(){
    localStorage.removeItem('access_token');
  }

  register(registerUser : RegisterUser): Observable<any>{
    return this.http.post<any>(`${environment.userAPIBase}/register`, registerUser);
  }
}

