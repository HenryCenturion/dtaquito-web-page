import {Component} from '@angular/core';
import {SportSpace} from "../../models/sport-space.model";
import {MatDialogRef} from "@angular/material/dialog";
import {SportSpacesService} from "../../services/sport-spaces.service";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-sport-space-creation',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './sport-space-creation.component.html',
  styleUrl: './sport-space-creation.component.css'
})
export class SportSpaceCreationComponent {

  loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

  name: string = '';
  imageUrl: string = '';
  sport: string = '';
  description: string = '';
  price: number = 0;
  district: string = '';
  startTime: string = '';
  endTime: string = '';
  rating: number = 0;

  newSportSpace!: SportSpace;

  constructor(private dialogRef: MatDialogRef<SportSpaceCreationComponent>, private sportSpacesService: SportSpacesService) {

  }

  onSubmit() {

    const newSportSpace = {
      userId: this.loggedUser.id,
      name: this.name,
      sportId: this.sport,
      imageUrl: this.imageUrl,
      description: this.description,
      price: this.price,
      district: this.district,
      startTime: this.startTime,
      endTime: this.endTime,
      rating: this.rating
    };
    this.createSportSpace(newSportSpace);
  }


  createSportSpace(sportSpaceData: any) {
    this.sportSpacesService.createSportSpace(sportSpaceData).subscribe((data: SportSpace) => {
      this.newSportSpace = data;
      this.dialogRef.close();
      window.location.reload();
    });
  }
}
