import {Component} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    NgIf
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailControl: FormControl | undefined;
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.email.trim() === '' || this.password.trim() === '') {
      this.errorMessage = 'Please enter your credentials.';
    } else {

      this.emailControl = new FormControl(this.email, [Validators.required, this.emailFormatValidator]);

      if(this.emailControl.invalid) {
        this.errorMessage = 'Invalid email. Please try again.';
        return;
      }

      this.authService.login(this.email, this.password).subscribe(
        success => {},
        error => {
          this.errorMessage = 'Wrong email or password. Please try again.';
        }
      );
    }
  }

  emailFormatValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailPattern = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/i;
    const match = emailPattern.test(value);
    return match ? null : {emailFormat: true};
  }

}
