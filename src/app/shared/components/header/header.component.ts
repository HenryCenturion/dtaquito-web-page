import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from "@angular/common";
import {AuthService} from "../../../iam/services/auth.service";
import {User} from "../../../business/models/user.model";
import {UsersService} from "../../../business/services/users.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink,
    NgIf
  ],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('menu') menu!: ElementRef;
  isLoggedIn: boolean = false;
  menuOpen: boolean = false;
  loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
  protected userData: any | undefined;
  dataOwner = false;

  constructor(private authService: AuthService, private userService: UsersService) {
  }

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
      this.loggedUser = this.authService.getLoggedUser();
      if(this.authService.checkLoginStatus()){
        this.getUser();
      }
    });

  }
  getUser(){
    this.userService.getUserById(this.loggedUser.id).subscribe((data: any) => {
      this.userData = data;
      if(this.userData.roleType === 'R'){
        this.dataOwner = true;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  onDocumentClick(event: Event) {
    if (this.menuOpen && !this.menu.nativeElement.contains(event.target)) {
      this.toggleMenu();
    }
  }

}
