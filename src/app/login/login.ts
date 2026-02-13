import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private authService = inject(Auth);
  private route = inject(Router);
  
/* 
  Create a Login Component with a reactive form containing email (required, email validator) and password (required, min 6 characters) fields - on successful form submission, call AuthService.login(email) to save the email to localStorage, update authentication state, and navigate to /products.
   */

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      
      // Call AuthService.login(email) here to save the email to localStorage and update authentication state
      this.authService.login(email!);
      // Then navigate to /products
      // use route.nav
      this.route.navigate(['/products']);

    }
  }
}
