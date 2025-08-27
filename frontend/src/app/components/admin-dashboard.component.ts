import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-dashboard">
      <div class="admin-header">
        <div class="container">
          <div class="header-content">
            <div class="header-left">
              <div class="header-info">
                <h1>Admin Dashboard</h1>
                <p>Manage users, templates, and analytics</p>
              </div>
            </div>
            <div class="header-right">
              <button class="btn-logout" (click)="logout()">
                <i class="fas fa-sign-out-alt"></i>
                Logout
              </button>
            </div>
            <div class="admin-badge">
              <i class="fas fa-crown"></i>
              Admin
            </div>
          </div>
        </div>
      </div>

      <div class="dashboard-content">
        <div class="container">
          <!-- Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon users">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-info">
                <h3>{{ stats.totalUsers }}</h3>
                <p>Total Users</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon templates">
                <i class="fas fa-file-alt"></i>
              </div>
              <div class="stat-info">
                <h3>{{ stats.totalTemplates }}</h3>
                <p>Templates</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon signatures">
                <i class="fas fa-signature"></i>
              </div>
              <div class="stat-info">
                <h3>{{ stats.totalSignatures }}</h3>
                <p>Signatures Created</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon pro">
                <i class="fas fa-crown"></i>
              </div>
              <div class="stat-info">
                <h3>{{ stats.proUsers }}</h3>
                <p>PRO Users</p>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="admin-tabs">
            <button class="tab-btn" [class.active]="activeTab === 'users'" (click)="activeTab = 'users'">
              <i class="fas fa-users"></i>
              User Management
            </button>
            <button class="tab-btn" [class.active]="activeTab === 'templates'" (click)="activeTab = 'templates'">
              <i class="fas fa-file-alt"></i>
              Template Management
            </button>
            <button class="tab-btn" [class.active]="activeTab === 'analytics'" (click)="activeTab = 'analytics'">
              <i class="fas fa-chart-bar"></i>
              Analytics
            </button>
          </div>

          <!-- User Management Tab -->
          <div class="tab-content" *ngIf="activeTab === 'users'">
            <div class="content-header">
              <h2>User Management</h2>
              <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Search users..." [(ngModel)]="userSearch">
              </div>
            </div>
            
            <div class="users-table">
              <div class="table-header">
                <div class="col">Name</div>
                <div class="col">Email</div>
                <div class="col">Status</div>
                <div class="col">Joined</div>
                <div class="col">Actions</div>
              </div>
              <div class="table-row" *ngFor="let user of filteredUsers">
                <div class="col">
                  <div class="user-info">
                    <div class="user-avatar">{{ user.firstName?.charAt(0) || 'U' }}</div>
                    <div>
                      <div class="user-name">{{ user.firstName }} {{ user.lastName }}</div>
                      <div class="user-company">{{ user.company || 'No company' }}</div>
                    </div>
                  </div>
                </div>
                <div class="col">{{ user.email }}</div>
                <div class="col">
                  <span class="status-badge" [class.pro]="user.isPro" [class.free]="!user.isPro">
                    {{ user.isPro ? 'PRO' : 'FREE' }}
                  </span>
                </div>
                <div class="col">{{ formatDate(user.createdAt) }}</div>
                <div class="col">
                  <button class="action-btn" (click)="toggleUserPro(user)">
                    {{ user.isPro ? 'Remove PRO' : 'Make PRO' }}
                  </button>
                  <button class="action-btn delete" (click)="deleteUser(user)">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Template Management Tab -->
          <div class="tab-content" *ngIf="activeTab === 'templates'">
            <div class="content-header">
              <h2>Template Management</h2>
              <button class="btn btn-primary" (click)="showAddTemplate = true">
                <i class="fas fa-plus"></i>
                Add Template
              </button>
            </div>

            <div class="templates-grid">
              <div class="template-card" *ngFor="let template of templates">
                <div class="template-preview">
                  <div class="template-name">{{ template.name }}</div>
                  <div class="template-type">{{ template.type }}</div>
                </div>
                <div class="template-actions">
                  <button class="action-btn" (click)="editTemplate(template)">Edit</button>
                  <button class="action-btn delete" (click)="deleteTemplate(template)">Delete</button>
                </div>
              </div>
            </div>

            <!-- Add Template Modal -->
            <div class="modal" *ngIf="showAddTemplate" (click)="showAddTemplate = false">
              <div class="modal-content" (click)="$event.stopPropagation()">
                <h3>Add New Template</h3>
                <form (ngSubmit)="addTemplate()">
                  <div class="form-group">
                    <label>Template Name</label>
                    <input type="text" class="form-control" [(ngModel)]="newTemplate.name" name="name" required>
                  </div>
                  <div class="form-group">
                    <label>Type</label>
                    <select class="form-control" [(ngModel)]="newTemplate.type" name="type" required>
                      <option value="free">Free</option>
                      <option value="pro">PRO</option>
                    </select>
                  </div>
                  <div class="modal-actions">
                    <button type="button" class="btn btn-secondary" (click)="showAddTemplate = false">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add Template</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- Analytics Tab -->
          <div class="tab-content" *ngIf="activeTab === 'analytics'">
            <div class="content-header">
              <h2>Analytics</h2>
            </div>
            
            <div class="analytics-grid">
              <div class="analytics-card">
                <h3>User Growth</h3>
                <div class="chart-placeholder">
                  <i class="fas fa-chart-line"></i>
                  <p>User registration trends over time</p>
                </div>
              </div>
              <div class="analytics-card">
                <h3>Template Usage</h3>
                <div class="chart-placeholder">
                  <i class="fas fa-chart-pie"></i>
                  <p>Most popular templates</p>
                </div>
              </div>
              <div class="analytics-card">
                <h3>Revenue</h3>
                <div class="chart-placeholder">
                  <i class="fas fa-dollar-sign"></i>
                  <p>PRO subscription revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      min-height: 100vh;
      background: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .admin-header {
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      padding: 1.5rem 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
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

    .btn-logout {
      background: rgba(239, 68, 68, 0.9);
      border: 1px solid rgba(239, 68, 68, 0.3);
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
    }

    .btn-logout:hover {
      background: rgba(239, 68, 68, 1);
      transform: translateY(-1px);
    }

    .header-info h1 {
      font-size: 1.75rem;
      font-weight: 600;
      color: white;
      margin-bottom: 0.25rem;
    }

    .header-info p {
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
      font-size: 0.875rem;
    }

    .admin-badge {
      background: #f59e0b;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-weight: 600;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .dashboard-content {
      padding: 2rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
    }

    .stat-icon.users { background: #3b82f6; }
    .stat-icon.templates { background: #10b981; }
    .stat-icon.signatures { background: #8b5cf6; }
    .stat-icon.pro { background: #f59e0b; }

    .stat-info h3 {
      font-size: 2rem;
      font-weight: 700;
      color: #111827;
      margin: 0;
    }

    .stat-info p {
      color: #6b7280;
      margin: 0;
      font-size: 0.875rem;
    }

    .admin-tabs {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 2rem;
      border-bottom: 1px solid #e5e7eb;
    }

    .tab-btn {
      background: none;
      border: none;
      padding: 1rem 1.5rem;
      color: #6b7280;
      font-weight: 500;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .tab-btn.active {
      color: #3b82f6;
      border-bottom-color: #3b82f6;
    }

    .tab-content {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .content-header h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }

    .search-box {
      position: relative;
      width: 300px;
    }

    .search-box i {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: #6b7280;
    }

    .search-box input {
      width: 100%;
      padding: 0.75rem 0.75rem 0.75rem 2.5rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 0.875rem;
    }

    .users-table {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
    }

    .table-header, .table-row {
      display: grid;
      grid-template-columns: 2fr 2fr 1fr 1fr 1.5fr;
      gap: 1rem;
      padding: 1rem;
      align-items: center;
    }

    .table-header {
      background: #f9fafb;
      font-weight: 600;
      color: #374151;
      font-size: 0.875rem;
    }

    .table-row {
      border-top: 1px solid #e5e7eb;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      background: #3b82f6;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
    }

    .user-name {
      font-weight: 500;
      color: #111827;
    }

    .user-company {
      font-size: 0.75rem;
      color: #6b7280;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .status-badge.pro {
      background: #fef3c7;
      color: #92400e;
    }

    .status-badge.free {
      background: #dcfce7;
      color: #166534;
    }

    .action-btn {
      background: #f3f4f6;
      border: 1px solid #d1d5db;
      color: #374151;
      padding: 0.375rem 0.75rem;
      border-radius: 6px;
      font-size: 0.75rem;
      cursor: pointer;
      margin-right: 0.5rem;
      transition: all 0.2s ease;
    }

    .action-btn:hover {
      background: #e5e7eb;
    }

    .action-btn.delete {
      color: #dc2626;
      border-color: #fca5a5;
    }

    .action-btn.delete:hover {
      background: #fee2e2;
    }

    .templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .template-card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 1.5rem;
      background: #f9fafb;
    }

    .template-name {
      font-weight: 600;
      color: #111827;
      margin-bottom: 0.5rem;
    }

    .template-type {
      font-size: 0.75rem;
      color: #6b7280;
      margin-bottom: 1rem;
    }

    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .analytics-card {
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 1.5rem;
      background: #f9fafb;
    }

    .analytics-card h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #111827;
      margin-bottom: 1rem;
    }

    .chart-placeholder {
      text-align: center;
      padding: 2rem;
      color: #6b7280;
    }

    .chart-placeholder i {
      font-size: 3rem;
      margin-bottom: 1rem;
      display: block;
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      width: 90%;
      max-width: 500px;
    }

    .modal-content h3 {
      margin-bottom: 1.5rem;
      color: #111827;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      font-weight: 500;
      color: #374151;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 0.875rem;
    }

    .modal-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 500;
      font-size: 0.875rem;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: #6b7280;
      color: white;
    }

    .btn-secondary:hover {
      background: #4b5563;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  activeTab = 'users';
  userSearch = '';
  showAddTemplate = false;
  
  stats = {
    totalUsers: 0,
    totalTemplates: 0,
    totalSignatures: 0,
    proUsers: 0
  };

  users: any[] = [];
  templates: any[] = [];

  newTemplate = { name: '', type: 'free' };

  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Check if user is admin
    if (!this.isAdmin()) {
      this.router.navigate(['/']);
      return;
    }
    
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loadUsers();
    this.loadTemplates();
    this.loadStats();
  }

  loadUsers() {
    this.http.get<any[]>(`${environment.apiUrl}/admin/users`).subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  loadTemplates() {
    this.http.get<any[]>(`${environment.apiUrl}/admin/templates`).subscribe({
      next: (templates) => {
        this.templates = templates;
      },
      error: (error) => {
        console.error('Error loading templates:', error);
      }
    });
  }

  loadStats() {
    this.http.get<any>(`${environment.apiUrl}/admin/stats`).subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error loading stats:', error);
      }
    });
  }

  get filteredUsers() {
    return this.users.filter(user => 
      user.firstName.toLowerCase().includes(this.userSearch.toLowerCase()) ||
      user.lastName.toLowerCase().includes(this.userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(this.userSearch.toLowerCase())
    );
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.email === 'admin@gmail.com';
  }

  toggleUserPro(user: any) {
    this.http.put(`${environment.apiUrl}/admin/users/${user.id}/pro`, { isPro: !user.isPro }).subscribe({
      next: () => {
        user.isPro = !user.isPro;
        this.showToast(`User ${user.isPro ? 'upgraded to' : 'downgraded from'} PRO`);
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.showToast('Error updating user status');
      }
    });
  }

  deleteUser(user: any) {
    if (confirm(`Delete user ${user.firstName} ${user.lastName}?`)) {
      this.http.delete(`${environment.apiUrl}/admin/users/${user.id}`).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
          this.showToast('User deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.showToast('Error deleting user');
        }
      });
    }
  }

  addTemplate() {
    if (this.newTemplate.name) {
      this.http.post(`${environment.apiUrl}/admin/templates`, this.newTemplate).subscribe({
        next: (template) => {
          this.templates.push(template);
          this.newTemplate = { name: '', type: 'free' };
          this.showAddTemplate = false;
          this.showToast('Template added successfully');
        },
        error: (error) => {
          console.error('Error adding template:', error);
          this.showToast('Error adding template');
        }
      });
    }
  }

  editTemplate(template: any) {
    this.showToast('Edit template functionality coming soon');
  }

  deleteTemplate(template: any) {
    if (confirm(`Delete template ${template.name}?`)) {
      this.http.delete(`${environment.apiUrl}/admin/templates/${template.id}`).subscribe({
        next: () => {
          this.templates = this.templates.filter(t => t.id !== template.id);
          this.showToast('Template deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting template:', error);
          this.showToast('Error deleting template');
        }
      });
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // Clear AuthService state
    (this.authService as any).currentUserSubject.next(null);
    
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