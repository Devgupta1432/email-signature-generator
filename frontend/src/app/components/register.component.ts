import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../models/user.model';

@Component({
  selector: 'app-register',
  template: `
    <div class="auth-container">
      <div class="auth-background"></div>
      <div class="container">
        <div class="row justify-content-center align-items-center min-vh-100">
          <div class="col-lg-6 col-md-8">
            <div class="auth-card">
              <div class="auth-header">
                <div class="brand-logo">
                  <i class="fas fa-user-plus"></i>
                </div>
                <h2>Create Account</h2>
                <p>Join us and start creating amazing signatures</p>
              </div>
              
              <div class="auth-body">
                <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-icon">
                            <i class="fas fa-user"></i>
                          </span>
                          <input type="text" class="form-control" placeholder="First Name" 
                                 [(ngModel)]="registerData.firstName" name="firstName" required>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-icon">
                            <i class="fas fa-user"></i>
                          </span>
                          <input type="text" class="form-control" placeholder="Last Name" 
                                 [(ngModel)]="registerData.lastName" name="lastName" required>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-icon">
                        <i class="fas fa-envelope"></i>
                      </span>
                      <input type="email" class="form-control" placeholder="Email address" 
                             [(ngModel)]="registerData.email" name="email" required>
                    </div>
                  </div>
                  
                  <div class="form-group">
                    <div class="input-group">
                      <span class="input-icon">
                        <i class="fas fa-lock"></i>
                      </span>
                      <input type="password" class="form-control" placeholder="Password (min 6 characters)" 
                             [(ngModel)]="registerData.password" name="password" required minlength="6">
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-icon">
                            <i class="fas fa-building"></i>
                          </span>
                          <input type="text" class="form-control" placeholder="Company" 
                                 [(ngModel)]="registerData.company" name="company">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-icon">
                            <i class="fas fa-briefcase"></i>
                          </span>
                          <input type="text" class="form-control" placeholder="Job Title" 
                                 [(ngModel)]="registerData.designation" name="designation">
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-icon">
                            <i class="fas fa-mobile-alt"></i>
                          </span>
                          <input type="text" class="form-control" placeholder="Mobile Number" 
                                 [(ngModel)]="registerData.mobile" name="mobile">
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <div class="input-group">
                          <span class="input-icon">
                            <i class="fas fa-phone"></i>
                          </span>
                          <input type="text" class="form-control" placeholder="Office Number" 
                                 [(ngModel)]="registerData.officeNumber" name="officeNumber">
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="terms-checkbox">
                    <label class="checkbox-container">
                      <input type="checkbox" required>
                      <span class="checkmark"></span>
                      I agree to the <a href="#" class="terms-link">Terms & Conditions</a>
                    </label>
                  </div>
                  
                  <button type="submit" class="btn btn-auth-primary" [disabled]="!registerForm.form.valid">
                    <span *ngIf="!isLoading">Create Account</span>
                    <span *ngIf="isLoading">
                      <i class="fas fa-spinner fa-spin"></i> Creating account...
                    </span>
                  </button>
                </form>
                
                <div class="divider">
                  <span>or sign up with</span>
                </div>
                
                <div class="social-login">
                  <button class="btn btn-google" (click)="signupWithGoogle()">
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
                  <p>Already have an account? <a routerLink="/login" class="auth-link">Sign in</a></p>
                </div>
                
                <div *ngIf="message" class="alert alert-success">
                  <i class="fas fa-check-circle"></i> {{ message }}
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
      padding: 2rem 0;
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
      padding: 3rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      animation: slideUp 0.8s ease-out;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .brand-logo {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      font-size: 2rem;
      color: white;
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    }

    .form-group {
      margin-bottom: 1.5rem;
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
      padding: 1rem 1rem 1rem 3rem;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.8);
    }

    .form-control:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
      background: white;
    }

    .terms-checkbox {
      margin-bottom: 2rem;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 0.9rem;
      color: #6c757d;
    }

    .terms-link {
      color: #667eea;
      text-decoration: none;
    }

    .btn-auth-primary {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border: none;
      border-radius: 12px;
      color: white;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s ease;
      margin-bottom: 2rem;
    }

    .divider {
      text-align: center;
      margin: 2rem 0;
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
      gap: 0.75rem;
      margin-bottom: 2rem;
    }

    .btn-google {
      padding: 0.75rem;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      background: white;
      color: #6c757d;
      font-weight: 500;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn-google:hover {
      border-color: #db4437;
      color: #db4437;
      transform: translateY(-1px);
    }

    .alert {
      border-radius: 12px;
      border: none;
      padding: 1rem;
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .alert-success {
      background: rgba(40, 167, 69, 0.1);
      color: #28a745;
    }

    .alert-danger {
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
export class RegisterComponent implements OnInit {
  registerData: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    company: '',
    mobile: '',
    officeNumber: '',
    designation: ''
  };
  message: string = '';
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
    this.isLoading = true;
    this.error = '';
    this.message = '';
    
    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.message = 'Registration successful! Please check your email to verify your account.';
        setTimeout(() => {
          localStorage.removeItem('redirectAfterLogin');
          this.router.navigate([this.returnUrl]);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.error || error.message || 'Registration failed';
      }
    });
  }

  signupWithGoogle(): void {
    localStorage.setItem('redirectAfterLogin', this.returnUrl);
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }
}