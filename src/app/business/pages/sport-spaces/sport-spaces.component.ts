import { Component } from '@angular/core';
import { SportSpaceCardsComponent } from '../../components/sport-space-cards/sport-space-cards.component';

@Component({
  selector: 'app-sport-spaces',
  standalone: true,
  imports: [SportSpaceCardsComponent],
  templateUrl: './sport-spaces.component.html',
  styleUrl: './sport-spaces.component.css'
})
export class SportSpacesComponent {

}
