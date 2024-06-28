import { Injectable } from '@angular/core';
import {Observable, switchMap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SportSpace} from "../models/sport-space.model";
import {environment} from "../../../environment/environment";
import {SubscriptionsService} from "./subscriptions.service";
import {UsersService} from "./users.service";
import {AuthService} from "../../iam/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class SportSpacesService {
  subscriptionId: any;
  baseUrl = environment.baseUrl;
  loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
  protected userData: any | undefined;
  dataOwner = false;

  constructor(private authService: AuthService, private http:HttpClient, private subscriptionsService: SubscriptionsService, private usersService: UsersService) {
    if(this.authService.checkLoginStatus()) {
      this.subscriptionsService.getSubscriptionByUserId(this.loggedUser.id).subscribe(subscription => {
        this.subscriptionId = subscription.id;
      });
    }
  }

  getAllSportSpaces(): Observable<SportSpace[]> {
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const userId = loggedUser.id;
    this.getThatUser();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    if (this.dataOwner && userId) {
      console.log(userId);
      return this.http.get<SportSpace[]>(`${this.baseUrl}/sport-spaces?userId=${userId}`, httpOptions);
    } else {
      return this.http.get<SportSpace[]>(this.baseUrl + '/sport-spaces', httpOptions);
    }
  }

  getSportSpaceById(id: number): Observable<SportSpace> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.get<SportSpace>(`${this.baseUrl}/sport-spaces/${id}`, httpOptions);
  }

  createSportSpace(sportSpace: any): Observable<SportSpace> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.subscriptionsService.getSubscriptionById(this.subscriptionId).pipe(
      switchMap(subscription => {
        console.log(this.subscriptionId);
        if (subscription.planId !== 1) {
          alert('Necesitas tener plan premium para agregar espacios de juego');
          throw new Error('Only premium owners can add sport spaces');
        }

        return this.usersService.getUserById(this.loggedUser.id); // Usa el método getUserById aquí
      }),
      switchMap(user => {
        if (user.roleType === 'P') {
          sportSpace.userId = user.id;
          return this.http.post<SportSpace>(`${this.baseUrl}/sport-spaces`, sportSpace, httpOptions);
        } else {
          throw new Error('Only premium owners can add sport spaces');
        }
      })
    );
  }


  deleteSportSpace(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.delete(`${this.baseUrl}/sport-spaces/${id}`, httpOptions);
  }

  updateSportSpace(id: number, sportSpace: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.put(`${this.baseUrl}/sport-spaces/${id}`, sportSpace, httpOptions);
  }

  getThatUser(){
    this.usersService.getUserById(this.loggedUser.id).subscribe(
      (data: any) => {
        this.userData = data;
        if(this.userData.roleType === 'P'){
          this.dataOwner = true;
        }
      },
      (error) => {
        if (error.status === 401) {
          console.error('No autorizado. El usuario no está logueado o el token es inválido.');
        } else {
          console.error('Error al obtener el usuario:', error);
        }
      }
    );
  }
}
