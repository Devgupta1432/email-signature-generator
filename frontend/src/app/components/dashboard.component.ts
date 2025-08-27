import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PaymentService } from '../services/payment.service';
import { AuthResponse } from '../models/user.model';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <!-- Header -->
      <div class="dashboard-header">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-8">
              <div class="welcome-section">
                <h1 class="welcome-title">Welcome back, {{ currentUser?.firstName }}! 👋</h1>
                <p class="welcome-subtitle">Ready to create amazing email signatures?</p>
              </div>
            </div>
            <div class="col-md-4 text-end">
              <div class="user-actions">
                <span class="status-badge" [class.pro]="currentUser?.isPro">
                  <i class="fas fa-{{ currentUser?.isPro ? 'crown' : 'user' }}"></i>
                  {{ currentUser?.isPro ? 'PRO' : 'FREE' }}
                </span>
                <button class="btn btn-outline-light" (click)="logout()">
                  <i class="fas fa-sign-out-alt"></i> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upgrade Banner -->
      <div class="upgrade-banner" *ngIf="!currentUser?.isPro">
        <div class="container">
          <div class="upgrade-content">
            <div class="upgrade-icon">
              <i class="fas fa-rocket"></i>
            </div>
            <div class="upgrade-text">
              <h4>Unlock PRO Features</h4>
              <p>Get access to premium templates, advanced customization, and priority support!</p>
            </div>
            <div class="upgrade-actions">
              <button class="btn btn-gradient me-2" (click)="upgradeToPro('MONTHLY')">
                <i class="fas fa-crown"></i> Monthly - $9.99
              </button>
              <button class="btn btn-gradient-alt" (click)="upgradeToPro('ONE_TIME')">
                <i class="fas fa-star"></i> Lifetime - $29.99
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="dashboard-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="action-card templates-card">
                <div class="card-icon">
                  <i class="fas fa-palette"></i>
                </div>
                <div class="card-content">
                  <h4>Browse Templates</h4>
                  <p>Choose from 50+ professional templates designed for every industry</p>
                  <button class="btn btn-card-primary">
                    <i class="fas fa-eye"></i> Browse Templates
                  </button>
                </div>
              </div>
            </div>
            
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="action-card signatures-card">
                <div class="card-icon">
                  <i class="fas fa-folder-open"></i>
                </div>
                <div class="card-content">
                  <h4>My Signatures</h4>
                  <p>Manage and edit your existing email signatures with ease</p>
                  <button class="btn btn-card-secondary">
                    <i class="fas fa-list"></i> View Signatures
                  </button>
                </div>
              </div>
            </div>
            
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="action-card create-card">
                <div class="card-icon">
                  <i class="fas fa-plus-circle"></i>
                </div>
                <div class="card-content">
                  <h4>Create New</h4>
                  <p>Start building your professional email signature from scratch</p>
                  <button class="btn btn-card-success" (click)="createSignature()">
                    <i class="fas fa-rocket"></i> Create Signature
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      font-family: 'Inter', sans-serif;
    }

    .dashboard::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
      pointer-events: none;
    }

    .dashboard-header {
      padding: 2rem 0;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(255,255,255,0.2);
      position: relative;
      z-index: 1;
    }

    .dashboard-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    }

    .welcome-title {
      color: white;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      animation: fadeInUp 0.8s ease-out;
    }

    .welcome-subtitle {
      color: rgba(255,255,255,0.8);
      font-size: 1.1rem;
      margin-bottom: 0;
      animation: fadeInUp 0.8s ease-out 0.2s both;
    }

    .user-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
      animation: fadeInUp 0.8s ease-out 0.4s both;
    }

    .status-badge {
      background: rgba(255,255,255,0.2);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      font-weight: 600;
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    }

    .status-badge.pro {
      background: linear-gradient(45deg, #ffd700, #ffed4e);
      color: #333;
    }

    .upgrade-banner {
      background: linear-gradient(45deg, #ff6b6b, #ee5a24);
      padding: 1.5rem 0;
      margin-bottom: 2rem;
      position: relative;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .upgrade-banner::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
      pointer-events: none;
    }

    .upgrade-content {
      display: flex;
      align-items: center;
      gap: 2rem;
      color: white;
    }

    .upgrade-icon {
      font-size: 3rem;
      opacity: 0.8;
    }

    .upgrade-text h4 {
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .upgrade-text p {
      margin-bottom: 0;
      opacity: 0.9;
    }

    .btn-gradient {
      background: linear-gradient(45deg, #667eea, #764ba2);
      border: none;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-gradient:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .btn-gradient-alt {
      background: linear-gradient(45deg, #ffd700, #ffed4e);
      border: none;
      color: #333;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .dashboard-content {
      padding: 3rem 0;
    }

    .action-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 2rem;
      text-align: center;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    .action-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.04) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.04) 0%, transparent 50%);
      pointer-events: none;
    }

    .action-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(45deg, #667eea, #764ba2);
    }

    .action-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 24px 48px rgba(102, 126, 234, 0.2);
      background: rgba(255, 255, 255, 1);
    }

    .action-card:hover::before {
      opacity: 1;
    }

    .templates-card::before {
      background: linear-gradient(45deg, #667eea, #764ba2);
    }

    .signatures-card::before {
      background: linear-gradient(45deg, #f093fb, #f5576c);
    }

    .create-card::before {
      background: linear-gradient(45deg, #4facfe, #00f2fe);
    }

    .card-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 1.5rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      color: white;
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .card-icon::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: iconShine 3s ease-in-out infinite;
    }

    @keyframes iconShine {
      0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
      50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
      100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    }

    .signatures-card .card-icon {
      background: linear-gradient(135deg, #f093fb, #f5576c);
      box-shadow: 0 8px 24px rgba(240, 147, 251, 0.4);
    }

    .create-card .card-icon {
      background: linear-gradient(135deg, #4facfe, #00f2fe);
      box-shadow: 0 8px 24px rgba(79, 172, 254, 0.4);
    }

    .card-content h4 {
      font-weight: 600;
      margin-bottom: 1rem;
      color: #2c3e50;
    }

    .card-content p {
      color: #6c757d;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .btn-card-primary {
      background: linear-gradient(45deg, #667eea, #764ba2);
      border: none;
      color: white;
      padding: 0.75rem 2rem;
      border-radius: 25px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-card-secondary {
      background: linear-gradient(45deg, #f093fb, #f5576c);
      border: none;
      color: white;
      padding: 0.75rem 2rem;
      border-radius: 25px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-card-success {
      background: linear-gradient(45deg, #4facfe, #00f2fe);
      border: none;
      color: white;
      padding: 0.75rem 2rem;
      border-radius: 25px;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-card-primary:hover,
    .btn-card-secondary:hover,
    .btn-card-success:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .welcome-title {
        font-size: 2rem;
      }
      
      .upgrade-content {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
      }
      
      .upgrade-actions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: AuthResponse | null = null;

  constructor(
    private authService: AuthService,
    private paymentService: PaymentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }

  upgradeToPro(planType: string): void {
    this.paymentService.createCheckoutSession(planType).subscribe({
      next: (response) => {
        window.location.href = response.url;
      },
      error: (error) => {
        console.error('Payment error:', error);
      }
    });
  }

  createSignature(): void {
    this.router.navigate(['/editor']);
  }
}