import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-page">
      <div class="page-header">
        <div class="container">
          <div class="header-content">
            <div class="header-left">
              <button class="btn-back" (click)="goBack()">
                <i class="fas fa-arrow-left"></i>
                Back
              </button>
              <div class="header-info">
                <h1>My Profile</h1>
                <p>Manage your personal information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page-content">
        <div class="container">
          <div class="profile-card">
            <form (ngSubmit)="updateProfile()" #profileForm="ngForm">
              <div class="form-grid">
                <div class="form-group">
                  <label>First Name</label>
                  <input type="text" class="form-control" [(ngModel)]="userProfile.firstName" name="firstName" required>
                </div>
                <div class="form-group">
                  <label>Last Name</label>
                  <input type="text" class="form-control" [(ngModel)]="userProfile.lastName" name="lastName" required>
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="email" class="form-control" [(ngModel)]="userProfile.email" name="email" readonly>
                </div>
                <div class="form-group">
                  <label>Company</label>
                  <input type="text" class="form-control" [(ngModel)]="userProfile.company" name="company">
                </div>
                <div class="form-group">
                  <label>Designation</label>
                  <input type="text" class="form-control" [(ngModel)]="userProfile.designation" name="designation">
                </div>
                <div class="form-group">
                  <label>Mobile</label>
                  <input type="tel" class="form-control" [(ngModel)]="userProfile.mobile" name="mobile">
                </div>
                <div class="form-group">
                  <label>Office Number</label>
                  <input type="tel" class="form-control" [(ngModel)]="userProfile.officeNumber" name="officeNumber">
                </div>
              </div>
              
              <div class="form-actions">
                <button type="submit" class="btn btn-primary" [disabled]="!profileForm.form.valid || isLoading">
                  <span *ngIf="!isLoading">Update Profile</span>
                  <span *ngIf="isLoading"><i class="fas fa-spinner fa-spin"></i> Updating...</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .page-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1.5rem 0;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.25);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .btn-back {
      background: rgba(255, 255, 255, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      padding: 0.625rem 1rem;
      border-radius: 8px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      cursor: pointer;
      font-size: 0.875rem;
      backdrop-filter: blur(10px);
    }

    .btn-back:hover {
      background: rgba(255, 255, 255, 0.25);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    .header-info h1 {
      font-size: 1.75rem;
      font-weight: 600;
      color: white;
      margin-bottom: 0.25rem;
    }

    .header-info p {
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      font-size: 0.875rem;
    }

    .page-content {
      padding: 2rem 0;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .profile-card {
      background: #ffffff;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      border: 1px solid #e5e7eb;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .form-control {
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .form-control:readonly {
      background: #f9fafb;
      color: #6b7280;
    }

    .form-actions {
      text-align: center;
    }

    .btn {
      padding: 0.75rem 2rem;
      border-radius: 8px;
      font-weight: 500;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
      border: none;
    }

    .btn-primary:hover:not(:disabled) {
      background: #2563eb;
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class UserProfileComponent implements OnInit {
  userProfile = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    designation: '',
    mobile: '',
    officeNumber: ''
  };
  
  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    // Load from localStorage or API
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userProfile = {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      company: user.company || '',
      designation: user.designation || '',
      mobile: user.mobile || '',
      officeNumber: user.officeNumber || ''
    };
  }

  updateProfile() {
    this.isLoading = true;
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(this.userProfile));
      this.isLoading = false;
      this.showToast('Profile updated successfully!');
    }, 1000);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  showToast(message: string) {
    const toast = document.createElement('div');
    toast.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        font-size: 14px;
        font-weight: 500;
      ">
        ${message}
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 3000);
  }
}