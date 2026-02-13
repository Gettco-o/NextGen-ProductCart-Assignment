import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private authState = new BehaviorSubject<boolean>(this.tokenExists());

  private router = inject(Router);

  isAuthenticated$ = this.authState.asObservable();

  login(email: string) {
    localStorage.setItem('userEmail', email);
    this.authState.next(true);
  }

  logout() {
    localStorage.removeItem('userEmail');
    this.authState.next(false);
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    return this.tokenExists();
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('userEmail');
  }

  private tokenExists(): boolean {
    return !!localStorage.getItem('userEmail');
  }
}