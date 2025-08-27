import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-background"></div>
      <div class="container">
        <div class="row justify-content-center align-items-center min-vh-100">
          <div class="col-lg-5 col-md-7">
            <div class="auth-card">
              <div class="auth-header">
                <div class="brand-logo">
                  <i class="fas fa-signature"></i>
                </div>
                <h2>Welcome Back</h2>
                <p>Sign in to your account to continue</p>
              </div>
              
              <div class="auth-body">
                <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-icon">
                        <i class="fas fa-envelope"></i>
                      </span>
                      <input type="email" class="form-control" placeholder="Email address" 
                             [(ngModel)]="loginData.email" name="email" required>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-icon">
                        <i class="fas fa-lock"></i>
                      </span>
                      <input type="password" class="form-control" placeholder="Password" 
                             [(ngModel)]="loginData.password" name="password" required>
                    </div>
                  </div>
                  
                  <div class="form-options">
                    <label class="checkbox-container">
                      <input type="checkbox">
                      <span class="checkmark"></span>
                      Remember me
                    </label>
                    <a href="#" class="forgot-link">Forgot password?</a>
                  </div>
                  
                  <button type="submit" class="btn btn-auth-primary">
                    <span *ngIf="!isLoading">Sign In</span>
                    <span *ngIf="isLoading">
                      <i class="fas fa-spinner fa-spin"></i> Signing in...
                    </span>
                  </button>
                </form>
                
                <div class="divider">
                  <span>or continue with</span>
                </div>
                
                <div class="social-login">
                  <button class="btn btn-google" (click)="loginWithGoogle()">
                    <i class="fab fa-google"></i>
                    Google
                  </button>
                  <button class="btn btn-facebook">
                    <i class="fab fa-facebook-f"></i>
                    Facebook
                  </button>
                  <button class="btn btn-linkedin">
                    <i class="fab fa-linkedin-in"></i>
                    LinkedIn
                  </button>
                </div>
                
                <div class="auth-footer">
                  <p>Don't have an account? <a routerLink="/register" class="auth-link">Sign up</a></p>
                </div>
                
                <div *ngIf="error" class="alert alert-danger">
                  <i class="fas fa-exclamation-circle"></i> {{ error }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      position: relative;
      display: flex;
      align-items: center;
    }

    .auth-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: -1;
    }

    .auth-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: slideUp 0.8s ease-out;
      max-width: 400px;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .brand-logo {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 1.5rem;
      color: white;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    }

    .auth-header h2 {
      color: #2c3e50;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .auth-header p {
      color: #6c757d;
      margin-bottom: 0;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .input-group {
      position: relative;
    }

    .input-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #6c757d;
      z-index: 2;
    }

    .form-control {
      padding: 0.8rem 0.8rem 0.8rem 2.5rem;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.8);
    }

    .form-control:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
      background: white;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 0.9rem;
      color: #6c757d;
    }

    .checkbox-container input {
      margin-right: 0.5rem;
    }

    .forgot-link {
      color: #667eea;
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .btn-auth-primary {
      width: 100%;
      padding: 0.8rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border: none;
      border-radius: 12px;
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
      transition: all 0.3s ease;
      margin-bottom: 1.5rem;
    }

    .btn-auth-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }

    .divider {
      text-align: center;
      margin: 1.5rem 0;
      position: relative;
    }

    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: #e9ecef;
    }

    .divider span {
      background: rgba(255, 255, 255, 0.95);
      padding: 0 1rem;
      color: #6c757d;
      font-size: 0.9rem;
    }

    .social-login {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }

    .btn-google, .btn-facebook, .btn-linkedin {
      padding: 0.6rem;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      background: white;
      color: #6c757d;
      font-weight: 500;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.3rem;
      font-size: 0.8rem;
    }

    .btn-google:hover {
      border-color: #db4437;
      color: #db4437;
      transform: translateY(-1px);
    }

    .auth-footer {
      text-align: center;
      margin-top: 2rem;
    }

    .auth-link {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .alert {
      border-radius: 12px;
      border: none;
      padding: 1rem;
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(220, 53, 69, 0.1);
      color: #dc3545;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginData: LoginRequest = { email: '', password: '' };
  error: string = '';
  isLoading: boolean = false;
  returnUrl: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || localStorage.getItem('redirectAfterLogin') || '/';
  }

  onSubmit(): void {
    console.log('Form submitted with:', this.loginData);
    this.isLoading = true;
    this.error = '';
    
    // Check for admin credentials
    if (this.loginData.email === 'admin@gmail.com' && this.loginData.password === 'admin1234') {
      console.log('Admin login detected');
      this.isLoading = false;
      const adminUser = {
        token: 'admin-token',
        type: 'Bearer',
        id: 1,
        email: 'admin@gmail.com',
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
        isPro: true
      };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      localStorage.setItem('user', JSON.stringify(adminUser));
      
      // Update AuthService state
      (this.authService as any).currentUserSubject.next(adminUser);
      
      console.log('Navigating to admin dashboard');
      this.router.navigate(['/admin']);
      return;
    }
    
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        localStorage.removeItem('redirectAfterLogin');
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.error || error.message || 'Invalid credentials';
      }
    });
  }

  loginWithGoogle(): void {
    localStorage.setItem('redirectAfterLogin', this.returnUrl);
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }
}