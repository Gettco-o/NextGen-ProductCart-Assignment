import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private authState = new BehaviorSubject<boolean>(this.tokenExists());
  private http = inject(HttpClient);

  private router = inject(Router);
  private readonly baseUrl = 'http://127.0.0.1:3000/api/v1/auth';

  isAuthenticated$ = this.authState.asObservable();

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('userEmail', email);
          this.authState.next(true);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
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
    return !!localStorage.getItem('access_token');
  }
}
