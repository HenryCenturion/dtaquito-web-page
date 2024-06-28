import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardImage} from "@angular/material/card";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {SportSpacesService} from "../../services/sport-spaces.service";
import {SportSpace} from "../../models/sport-space.model";
import {ShortTimePipe} from "../../../shared/pipes/short-time.pipe";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {SportSpaceCreationComponent} from "../sport-space-creation/sport-space-creation.component";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user.model";
import {AuthService} from "../../../iam/services/auth.service";


@Component({
  selector: 'app-sport-space-cards',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardImage,
    NgOptimizedImage,
    NgForOf,
    ShortTimePipe,
    FormsModule,
    NgIf,
    SportSpaceCreationComponent
  ],
  templateUrl: './sport-space-cards.component.html',
  styleUrl: './sport-space-cards.component.css'
})
export class SportSpaceCardsComponent implements OnInit {
  sportSpaces: any[] = [];
  loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
  protected userData: any | undefined;
  dataOwner = false;

  constructor(private sportSpacesService: SportSpacesService,
              private router: Router,
              private dialog: MatDialog,
              private userService: UsersService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getSportSpaces();
    if(this.authService.checkLoginStatus()){
      this.getUser();
    }
  }

  getUser(){
    this.userService.getUserById(this.loggedUser.id).subscribe(
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

  getSportSpaces() {
    this.sportSpacesService.getAllSportSpaces().subscribe((data: SportSpace[]) => {
      this.sportSpaces = data;
    });
  }

  goToDetail(sportSpace: SportSpace) {
    this.router.navigate(['/sport-spaces', sportSpace.id]);
  }

  openCreateSportSpaceDialog() {
    const dialogRef = this.dialog.open(SportSpaceCreationComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sportSpaces.push(result);
      }
    });
  }

  deleteSportSpace(id: number, event: Event): void {
    event.stopPropagation();

    const confirmation = confirm('Are you sure you want to delete this sport space?');
    if (!confirmation) {
      return;
    }

    this.sportSpacesService.deleteSportSpace(id).subscribe(() => {
      window.location.reload();
    });
  }

}

