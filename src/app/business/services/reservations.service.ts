import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Reservation} from "../models/reservation.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getReservationById(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get(`${this.baseUrl}/reservations/${id}`, httpOptions);
  }

  getAllReservations(): Observable<Reservation[]> {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservations?userId=${loggedUser.id}`, httpOptions);
  }

  createReservation(reservation: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post(`${this.baseUrl}/reservations`, reservation, httpOptions);
  }

  deleteReservation(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.delete(`${this.baseUrl}/reservations/${id}`, httpOptions);
  }
}
