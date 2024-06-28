import {Component, OnInit} from '@angular/core';
import {SportSpacesService} from "../../services/sport-spaces.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {SportSpace} from "../../models/sport-space.model";
import {ReservationsService} from "../../services/reservations.service";
import {Reservation} from "../../models/reservation.model";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent implements OnInit{
  reservations: any[] = [];
  loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

  constructor(private sportSpacesService: SportSpacesService, private reservationService: ReservationsService,private router: Router, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getAllReservations().subscribe((data: Reservation[]) => {
      this.reservations = data;
      this.reservations.forEach(reservation => {
        if (reservation.sportSpacesId) {
          this.sportSpacesService.getSportSpaceById(reservation.sportSpacesId).subscribe((sportSpace: SportSpace) => {
            reservation.sportSpaceName = sportSpace.name;
          });
        }
      });
    });
  }

  cancelReservation(id: number) {
    const confirmation = confirm('¿Estás seguro de que quieres cancelar esta reserva?');
    if (confirmation) {
      this.reservationService.deleteReservation(id).subscribe(() => {
        location.reload();
        this.getReservations();
      });
    }
  }
}
