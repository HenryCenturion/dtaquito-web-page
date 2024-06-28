import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

/**
 * Component for the authentication section.
 * @summary
 * This component provides the UI for the authentication section.
 * It displays the current username and provides buttons for signing in, signing up, and signing out.
 */
@Component({
  selector: 'app-authentication-section',
  templateUrl: './authentication-section.component.html',
  standalone: true,
  imports: [
    MatButton,
    NgIf
  ],
  styleUrl: './authentication-section.component.css'
})
export class AuthenticationSectionComponent {
  currentUserName: string = '';
  isSignedIn: boolean = false;
  constructor(private router: Router, private authenticationService: AuthService) {
    this.authenticationService.isLoggedIn$.subscribe((isSignedIn) => this.isSignedIn = isSignedIn);
  }

  /**
   * Event Handler for the sign-in button.
   */
  onSignIn() {
    // Navigate to the sign-in page.
    this.router.navigate(['/sign-in']).then();
  }

  /**
   * Event Handler for the sign-up button.
   */
  onSignUp() {
    // Navigate to the sign-up page.
    this.router.navigate(['/sign-up']).then();
  }

  /**
   * Event Handler for the sign-out button.
   */
  onSignOut() {
    // Sign out the user.
    this.authenticationService.logout();
  }
}
