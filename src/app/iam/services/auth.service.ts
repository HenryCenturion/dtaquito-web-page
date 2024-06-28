import { Injectable } from '@angular/core';
import {
  HttpClient, HttpErrorResponse,
} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import { User } from "../../business/models/user.model";
import {UsersService} from "../../business/services/users.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.checkLoginStatus());

  constructor(private router: Router, private http: HttpClient, private userService: UsersService) { }

  get isLoggedIn$() {
    return this.isLoggedIn.asObservable();
  }

  register(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    console.log(user);
    return this.userService.createUser(user).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `An error occurred: ${error.error.message}`;
        } else {
          errorMsg = `Server returned code: ${error.status}, error message is: ${error.message}`;
        }
        console.error(errorMsg);
        return throwError(errorMsg);
      })
    );
  }

  login(email: string, password: string): Observable<User> {
    const body = { email: email, password: password };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post<User>('https://dtaquito-backend.azurewebsites.net/api/v1/authentication/sign-in', body, httpOptions).pipe(
      tap(user => {
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('loggedUser', JSON.stringify(user));
          this.isLoggedIn.next(true);
          this.router.navigate(['/home']);
        }
      }),
      catchError(error => {
        return throwError('Usuario o contraseña incorrectos');
      })
    );
  }

  logout() {
    this.isLoggedIn.next(false);
    localStorage.removeItem('loggedUser');
    localStorage.removeItem('token');
    this.router.navigate(['/home']).then();
  }

  checkLoginStatus(): boolean {
    return localStorage.getItem('loggedUser') !== null;
  }

  getLoggedUser(): User | null {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user) : null;
  }
}
