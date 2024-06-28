import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user.model";
import {UsersService} from "../../services/users.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  originalUser: User | null = null;
  loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
  editing: boolean = false;
  newPassword: string = '';

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.getUserById(this.loggedUser.id).subscribe(user => {
      this.user = user;
      this.originalUser = {...user};
    });
  }

  updateUser() {
    if (this.user !== null) {
      // Si el usuario ha ingresado una nueva contraseña, actualízala
      if (this.newPassword) {
        this.user.password = this.newPassword;
      }
      this.usersService.updateUserById(this.loggedUser.id, this.user).subscribe(updatedUser => {
        this.user = updatedUser;
        this.editing = false;
        this.newPassword = '';
      });
    } else {
      console.log('User is null');
    }
  }

  cancelUpdate() {
    this.editing = false;
    this.newPassword = '';
    if (this.originalUser !== null) {
      this.user = {...this.originalUser};
    }
  }
}
