import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getSubscriptionById(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get(`${this.baseUrl}/suscriptions/${id}`, httpOptions);
  }

  updateSubscription(id: number, subscription: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.put(`${this.baseUrl}/suscriptions/${id}`, subscription, httpOptions);
  }

  getSubscriptionByUserId(userId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get(`${this.baseUrl}/suscriptions?userId=${userId}`, httpOptions);
  }
}
