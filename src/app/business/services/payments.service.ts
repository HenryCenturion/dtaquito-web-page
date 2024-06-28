import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  createPayment(payment: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post(`${this.baseUrl}/payments`, payment, httpOptions);
  }

  getAllPayments(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get(`${this.baseUrl}/payments`, httpOptions);
  }

  getPaymentByUserId(userId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get(`${this.baseUrl}/payments?userId=${userId}`, httpOptions).pipe(
      catchError(error => {
        if (error.status === 404) {
          console.log('No payment method found for user');
          return of(null);
        }
        throw error;
      })
    );
  }

  deletePayment(paymentId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.delete(`${this.baseUrl}/payments/${paymentId}`, httpOptions);
  }
}
