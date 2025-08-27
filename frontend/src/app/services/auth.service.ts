import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<AuthResponse | null>;
  public currentUser: Observable<AuthResponse | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthResponse | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  register(request: RegisterRequest): Observable<string> {
    // Clean up empty strings to null for optional fields
    const cleanRequest = {
      ...request,
      company: request.company?.trim() || null,
      mobile: request.mobile?.trim() || null,
      officeNumber: request.officeNumber?.trim() || null,
      designation: request.designation?.trim() || null
    };
    console.log('Sending register request:', cleanRequest);
    console.log('API URL:', `${environment.apiUrl}/auth/register`);
    return this.http.post<string>(`${environment.apiUrl}/auth/register`, cleanRequest, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    console.log('Sending login request:', request);
    console.log('API URL:', `${environment.apiUrl}/auth/login`);
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, request, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(map(response => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        return response;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  verifyEmail(token: string): Observable<string> {
    return this.http.get<string>(`${environment.apiUrl}/auth/verify-email?token=${token}`);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  isPro(): boolean {
    return this.currentUserValue?.isPro || false;
  }

  getToken(): string | null {
    return this.currentUserValue?.token || null;
  }

  setToken(token: string): void {
    // Create minimal auth response for OAuth2
    const authResponse: AuthResponse = {
      token,
      type: 'Bearer',
      id: 0,
      email: '',
      firstName: 'User',
      lastName: '',
      isPro: false,
      role: 'USER'
    };
    localStorage.setItem('currentUser', JSON.stringify(authResponse));
    this.currentUserSubject.next(authResponse);
  }

  getUserProfile(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.apiUrl}/auth/profile`);
  }
}