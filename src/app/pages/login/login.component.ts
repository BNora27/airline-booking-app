import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  isLoading: boolean = false;
  loginError: string = '';
  showLoginForm: boolean = true;
  loadingSubscription?: Subscription;
  
  constructor(private fb: FormBuilder, private router: Router, private loadingService: FakeLoadingService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe;
  }

  login() {
    const username = this.loginForm.get('username')?.value || '';
    const password = this.loginForm.get('password')?.value || '';

    this.isLoading = true;
    this.showLoginForm = false;
    this.loginError = '';


    this.loadingService.loadingWithPromise(username, password).then((_: boolean) => {
      console.log("This executed!");
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigateByUrl('/profile').then(() => {
        window.location.reload();
      })
    }).catch(error => {
      this.isLoading = false;
      this.showLoginForm = true;
      this.loginError = 'Invalid username or password!';
      console.error(error);
    }).finally(() => {
      console.log("This executed finally!");
    });

    console.log("This executed first!");
  }
}
