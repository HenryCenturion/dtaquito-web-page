import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {
  AbstractControl, FormControl, FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    FormsModule
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  roles: string = '';
  emailControl: FormControl | undefined;
  message = '';
  showPopup = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {

    this.emailControl = new FormControl(this.email, [Validators.required, this.emailFormatValidator]);

    if(this.emailControl.invalid) {
      return;
    }

    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      roles: [this.roles]
    };

    this.authService.register(newUser).subscribe(
      response => {
        this.message = 'Successfully registered';
        this.showPopup = true;

        setTimeout(() => {
          this.showPopup = false;
          this.router.navigate(['/login']);
        }, 2000);
      });
  }

  emailFormatValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const emailPattern = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/i;
    const match = emailPattern.test(value);
    return match ? null : {emailFormat: true};
  }
}
