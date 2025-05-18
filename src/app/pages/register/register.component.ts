import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  });

  isLoading = false;
  showForm = true;
  registerError = '';

  constructor(
    private router: Router,
    private authService: AuthService) {}

  register(): void {
    if (this.registerForm.invalid) {
      this.registerError = 'Please correct the form errors before submitting.';
      return;
    }

    const password = this.registerForm.get('password')?.value;
    const rePassword = this.registerForm.get('rePassword')?.value;
    
    if (password !== rePassword) {
      this.registerError = 'The passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const userData: Partial<User> = {
      name: {
        firstname: this.registerForm.value.name?.firstname || '',
        lastname: this.registerForm.value.name?.lastname || ''
      },
      email: this.registerForm.value.email || '',
    };

    const email = this.registerForm.value.email || '';
    const pw = this.registerForm.value.password || '';

    this.authService.register(email, pw, userData)
      .then(userCredential => {
        console.log('Registration succesful:', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.error('Regisztrációs hiba:', error);
        this.isLoading = false;
        this.showForm = true;
        
        switch(error.code) {
          case 'auth/email-already-in-use':
            this.registerError = 'This email already in use.';
            break;
          case 'auth/invalid-email':
            this.registerError = 'Invalid email.';
            break;
          case 'auth/weak-password':
            this.registerError = 'The password is too weak. Use at least 6 characters.';
            break;
          default:
            this.registerError = 'An error has occurred during registration. Please try again later.';
        }
      });
  }

}

