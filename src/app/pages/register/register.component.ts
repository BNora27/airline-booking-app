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
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [
      Validators.required,
      this.phoneValidator
    ]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  });

  isLoading = false;
  showForm = true;
  registerError = '';

  constructor(private router: Router) {}

  register(): void {
    if (this.registerForm.invalid) {
      this.registerError = 'Please correct the form errors before submitting.';
      return;
    }

    const { password, rePassword } = this.registerForm.value;

    if (password !== rePassword) {
      this.registerError = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const newUser: User = {
      id: generateId(),
      username: this.registerForm.value.username || '',
      email: this.registerForm.value.email || '',
      password: password || '',
      phone: this.registerForm.value.phoneNumber || '',
      name: {
        firstname: this.registerForm.value.name?.firstname || '',
        lastname: this.registerForm.value.name?.lastname || ''
      }
    };

    console.log('Registered user:', newUser);

    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 2000);
  }

  phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex = /^\+\d{11}$/; // E.g. +36301234567
    return regex.test(value) ? null : { invalidPhone: true };
  }
}

function generateId(): string {
  return 'id-' + Math.random().toString(36).substr(2, 9);
}
