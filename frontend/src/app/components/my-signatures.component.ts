import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

interface Signature {
  id: number;
  name: string;
  template: string;
  createdAt: Date;
  lastModified: Date;
  previewHtml: string;
  userData: any;
}

@Component({
  selector: 'app-my-signatures',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="my-signatures-page">
      <!-- Header -->
      <div class="page-header">
        <div class="container">
          <div class="header-content">
            <div class="header-left">
              <button class="btn-back" (click)="goBack()">
                <i class="fas fa-arrow-left"></i>
                Back
              </button>
              <div class="header-info">
                <h1>My Signatures</h1>
                <p>Manage and edit your email signatures</p>
              </div>
            </div>
            <div class="header-right">
              <div class="user-status">
                <div class="status-indicator">
                  <div class="status-dot online"></div>
                  <span>Online</span>
                </div>
                <div class="pro-status">
                  <div class="status-dot" [class.pro]="authService.isPro()" [class.free]="!authService.isPro()"></div>
                  <span>{{ authService.isPro() ? 'PRO' : 'FREE' }}</span>
                </div>
              </div>
              <button class="btn-create" (click)="createNewSignature()">
                <i class="fas fa-plus"></i>
                Create New
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="page-content">
        <div class="container">
          <!-- Empty State -->
          <div class="empty-state" *ngIf="signatures.length === 0">
            <div class="empty-icon">
              <i class="fas fa-signature"></i>
            </div>
            <h3>No signatures yet</h3>
            <p>Create your first professional email signature to get started</p>
            <button class="btn-primary" (click)="createNewSignature()">
              <i class="fas fa-plus"></i>
              Create Your First Signature
            </button>
          </div>

          <!-- Signatures List -->
          <div class="signatures-list" *ngIf="signatures.length > 0">
            <div class="signature-bar" *ngFor="let signature of signatures; trackBy: trackBySignatureId">
              <div class="signature-info">
                <h3>{{ signature.name }}</h3>
                <div class="signature-meta">
                  <span class="template-badge" [class.pro-badge]="getTemplateStatus(signature.template) === 'pro'" [class.free-badge]="getTemplateStatus(signature.template) === 'free'">
                    {{ getTemplateName(signature.template) }}
                    <i class="fas fa-crown" *ngIf="getTemplateStatus(signature.template) === 'pro'"></i>
                  </span>
                  <span class="date">{{ formatDate(signature.lastModified) }}</span>
                </div>
              </div>
              <div class="signature-actions">
                <button class="action-btn view" (click)="viewSignature(signature)">
                  <i class="fas fa-eye"></i>
                  View
                </button>
                <button class="action-btn edit" (click)="editSignature(signature)" 
                        [disabled]="!isTemplateAccessible(signature.template)">
                  <i class="fas" [class.fa-edit]="isTemplateAccessible(signature.template)" 
                     [class.fa-lock]="!isTemplateAccessible(signature.template)"></i>
                  {{ isTemplateAccessible(signature.template) ? 'Edit' : 'Locked' }}
                </button>
                <button class="action-btn copy" (click)="copySignature(signature)">
                  <i class="fas fa-copy"></i>
                  Copy
                </button>
                <button class="action-btn delete" (click)="deleteSignature(signature, $event)">
                  <i class="fas fa-trash"></i>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .my-signatures-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .page-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1.5rem 0;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.25);
      position: relative;
      overflow: hidden;
    }

    .page-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="%23ffffff" opacity="0.15"/><circle cx="10" cy="60" r="0.5" fill="%23ffffff" opacity="0.15"/><circle cx="90" cy="40" r="0.5" fill="%23ffffff" opacity="0.15"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
      pointer-events: none;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 1;
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
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .btn-back:hover {
      background: rgba(255, 255, 255, 0.25);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .header-info h1 {
      font-size: 1.75rem;
      font-weight: 600;
      color: white;
      margin-bottom: 0.25rem;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .header-info p {
      color: rgba(255, 255, 255, 0.9);
      margin: 0;
      font-size: 0.875rem;
      font-weight: 400;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .user-status {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 0.875rem;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 500;
      color: white;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .status-indicator,
    .pro-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
    }

    .status-dot.online {
      background: #10b981;
    }

    .status-dot.pro {
      background: #fbbf24;
    }

    .status-dot.free {
      background: #f87171;
    }

    .btn-create {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 0.625rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      cursor: pointer;
      font-size: 0.875rem;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .btn-create:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .page-content {
      padding: 2rem 0;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      max-width: 500px;
      margin: 0 auto;
    }

    .empty-icon {
      width: 80px;
      height: 80px;
      background: #f3f4f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      color: #9ca3af;
      font-size: 2rem;
    }

    .empty-state h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
      margin-bottom: 0.5rem;
    }

    .empty-state p {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 2rem;
      line-height: 1.5;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 500;
      font-size: 0.875rem;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    /* Signatures List */
    .signatures-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .signature-bar {
      background: #ffffff;
      border-radius: 8px;
      padding: 1.25rem 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.2s ease;
    }

    .signature-bar:hover {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-color: #d1d5db;
    }

    .signature-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-weight: 500;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.375rem;
      transition: all 0.2s ease;
      cursor: pointer;
    }

    .action-btn.view {
      color: #3b82f6;
    }

    .action-btn.edit {
      color: #059669;
    }

    .action-btn.copy {
      color: #7c3aed;
    }

    .action-btn.delete {
      color: #dc2626;
    }

    .action-btn:hover {
      background: #f3f4f6;
      border-color: #d1d5db;
    }

    .action-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .signature-info {
      flex: 1;
    }

    .signature-info h3 {
      font-size: 1rem;
      font-weight: 500;
      color: #111827;
      margin-bottom: 0.5rem;
    }

    .signature-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .template-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .template-badge.free-badge {
      background: #dcfce7;
      color: #166534;
    }

    .template-badge.pro-badge {
      background: #fef3c7;
      color: #92400e;
    }

    .date {
      color: #6b7280;
      font-size: 0.75rem;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .page-header {
        padding: 1.25rem 0;
      }

      .header-content {
        flex-direction: column;
        gap: 1.5rem;
        align-items: stretch;
      }

      .header-left {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .header-info h1 {
        font-size: 1.875rem;
      }

      .header-right {
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .user-status {
        order: 2;
        flex: 1;
        justify-content: center;
      }

      .btn-create {
        order: 1;
        justify-content: center;
      }

      .signature-bar {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }

      .signature-actions {
        justify-content: center;
      }
    }

    .fas {
      font-size: 0.75rem;
    }
  `]
})
export class MySignaturesComponent implements OnInit {
  signatures: Signature[] = [];

  constructor(
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loadSignatures();
  }

  loadSignatures() {
    const savedSignatures = localStorage.getItem('userSignatures');
    if (savedSignatures) {
      this.signatures = JSON.parse(savedSignatures);
    } else {
      this.signatures = [];
    }
  }

  generateTemp1Preview(name: string, title: string, company: string): string {
    return `
      <div style="display: flex; align-items: flex-start; background-color: white; padding: 1rem; border: 1px solid rgb(226, 232, 240); border-radius: 8px; max-width: 600px; font-family: Arial; font-size: 14px; color: rgb(0, 0, 0); overflow: hidden; overflow-wrap: break-word;">
        <div style="flex: 0 0 200px; text-align: center; padding-right: 20px; border-right: 1px solid rgb(0, 0, 0);">
          <div style="width: 140px; height: 140px; margin: 0 auto;">
            <img src="https://via.placeholder.com/120" alt="Profile Image" style="width: 100%; height: 100%; border: 2px solid black; border-radius: 50%;">
          </div>
          <div style="text-align: center; width: 100%; margin-top: 10px;">
            <div style="text-align: center; font-size: 18px; font-weight: normal; color: rgb(0, 0, 0); margin-bottom: 5px;">${name || 'Your Name'}</div>
            <div style="text-align: center; font-size: 12px; letter-spacing: 2px; color: rgb(0, 0, 0);">${title || 'Your Title'}</div>
          </div>
        </div>
        <div style="flex: 1 1 0%; padding-left: 30px; display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
          <div style="color: rgb(0, 0, 0);">
            <div style="font-size: 18px; font-weight: bold; letter-spacing: 2px; color: #000; margin-bottom: 15px;">${company || 'Your Company'}</div>
            <div style="display: flex; align-items: center; margin-bottom: 8px; color: #000; font-size: 12px;">
              <span style="margin-right: 10px;">📞</span> 09350555767
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 8px; color: #000; font-size: 12px;">
              <span style="margin-right: 10px;">🌐</span> www.dev.com
            </div>
            <div style="display: flex; align-items: center; margin-bottom: 8px; color: #000; font-size: 12px;">
              <span style="margin-right: 10px;">📧</span> devgupta791@gmail.com
            </div>
          </div>
        </div>
      </div>
    `;
  }

  generateTemp2Preview(name: string, title: string, company: string): string {
    return `
      <div style="font-family: Arial, sans-serif; display: flex; gap: 2rem; align-items: flex-start; padding: 1.5rem; border-radius: 8px; max-width: 600px; background-color: #f9f6f4;">
        <div style="flex: 0 0 150px;">
          <div style="width: 150px; height: 210px; border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: 2px solid #000;"></div>
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 210px;">
          <div style="font-family: 'Brush Script MT', cursive; font-size: 24px; font-weight: normal; color: #000;">${name}</div>
          <div style="font-weight: bold; letter-spacing: 1px; font-size: 12px; color: #000;">${title}</div>
          <hr style="border: none; border-top: 2px solid #000; margin: 10px 0; margin-left: -32px; opacity: 1;">
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #000;">
              <i style="width: 14px; text-align: center;">📞</i> 09350555767
            </div>
            <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #000;">
              <i style="width: 14px; text-align: center;">📧</i> devgupta791@gmail.com
            </div>
            <div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #000;">
              <i style="width: 14px; text-align: center;">🌐</i> www.dev.com
            </div>
          </div>
        </div>
      </div>
    `;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  createNewSignature() {
    this.router.navigate(['/editor']);
  }

  editSignature(signature: Signature) {
    if (!this.isTemplateAccessible(signature.template)) {
      this.showToast('Upgrade to PRO to edit this signature!');
      return;
    }
    
    this.router.navigate(['/editor'], { 
      queryParams: { 
        template: signature.template,
        signatureId: signature.id 
      } 
    });
  }

  copySignature(signature: Signature) {
    // Create a temporary element to copy HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = signature.previewHtml;
    document.body.appendChild(tempDiv);
    
    // Select and copy the content
    const range = document.createRange();
    range.selectNodeContents(tempDiv);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    
    try {
      document.execCommand('copy');
      this.showToast('Signature copied to clipboard!');
    } catch (err) {
      // Fallback to text copy
      navigator.clipboard.writeText(signature.previewHtml).then(() => {
        this.showToast('Signature HTML copied to clipboard!');
      }).catch(() => {
        this.showToast('Copy failed. Please try again.');
      });
    } finally {
      document.body.removeChild(tempDiv);
      selection?.removeAllRanges();
    }
  }

  deleteSignature(signature: Signature, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    // Enhanced confirmation dialog
    const confirmDelete = confirm(`Are you sure you want to delete "${signature.name}"?\n\nThis action cannot be undone.`);
    
    if (confirmDelete) {
      // Add fade out animation
      const cardElement = event?.target as HTMLElement;
      const signatureCard = cardElement?.closest('.signature-card') as HTMLElement;
      
      if (signatureCard) {
        signatureCard.style.transition = 'all 0.3s ease';
        signatureCard.style.transform = 'scale(0.8)';
        signatureCard.style.opacity = '0';
        
        setTimeout(() => {
          this.signatures = this.signatures.filter(s => s.id !== signature.id);
          localStorage.setItem('userSignatures', JSON.stringify(this.signatures));
          this.showToast('Signature deleted successfully!');
        }, 300);
      } else {
        this.signatures = this.signatures.filter(s => s.id !== signature.id);
        localStorage.setItem('userSignatures', JSON.stringify(this.signatures));
        this.showToast('Signature deleted successfully!');
      }
    }
  }

  getTemplateName(template: string): string {
    const templateNames: { [key: string]: string } = {
      'temp1': 'Template 1 (Free)',
      'temp2': 'Template 2 (PRO)',
      'modern': 'Modern',
      'corporate': 'Corporate',
      'minimal': 'Minimal'
    };
    return templateNames[template] || 'Custom';
  }

  isTemplateAccessible(template: string): boolean {
    if (template === 'temp1') return true; // Always accessible
    if (template === 'temp2') return this.authService.isPro(); // PRO only
    return true; // Other templates
  }

  getTemplateStatus(template: string): string {
    if (template === 'temp1') return 'free';
    if (template === 'temp2') return 'pro';
    return 'free';
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  }

  getRelativeDate(date: Date): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'today';
    if (diffDays === 2) return 'yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  }

  trackBySignatureId(index: number, signature: Signature): number {
    return signature.id;
  }

  viewSignature(signature: Signature) {
    const viewWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
    if (viewWindow) {
      viewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${signature.name} - Preview</title>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
              margin: 0;
              padding: 40px;
              background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
              min-height: 100vh;
            }
            .preview-container {
              max-width: 800px;
              margin: 0 auto;
              background: white;
              border-radius: 20px;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .preview-header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .preview-header h1 {
              margin: 0 0 10px 0;
              font-size: 28px;
              font-weight: 700;
            }
            .preview-header p {
              margin: 0;
              opacity: 0.9;
              font-size: 16px;
            }
            .signature-container {
              padding: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 300px;
              background: #fafbfc;
            }
            .signature-wrapper {
              background: white;
              padding: 30px;
              border-radius: 12px;
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
              border: 1px solid #e2e8f0;
            }
            .actions {
              padding: 30px;
              text-align: center;
              background: white;
              border-top: 1px solid #e2e8f0;
            }
            .btn {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-weight: 600;
              cursor: pointer;
              margin: 0 10px;
              transition: all 0.3s ease;
            }
            .btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
            }
            .btn-secondary {
              background: #6c757d;
            }
            @media print {
              body { background: white; padding: 0; }
              .preview-container { box-shadow: none; }
              .preview-header, .actions { display: none; }
              .signature-container { padding: 20px; background: white; }
            }
          </style>
        </head>
        <body>
          <div class="preview-container">
            <div class="preview-header">
              <h1>${signature.name}</h1>
              <p>Email Signature Preview</p>
            </div>
            <div class="signature-container">
              <div class="signature-wrapper">
                ${signature.previewHtml}
              </div>
            </div>
            <div class="actions">
              <button class="btn" onclick="window.print()">Print</button>
              <button class="btn btn-secondary" onclick="window.close()">Close</button>
            </div>
          </div>
        </body>
        </html>
      `);
      viewWindow.document.close();
    }
  }

  showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
    const colors = {
      success: { bg: '#10b981', icon: 'fa-check-circle' },
      error: { bg: '#ef4444', icon: 'fa-exclamation-circle' },
      info: { bg: '#3b82f6', icon: 'fa-info-circle' }
    };
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, ${colors[type].bg} 0%, ${colors[type].bg}dd 100%);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        z-index: 9999;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 12px;
        backdrop-filter: blur(10px);
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      ">
        <i class="fas ${colors[type].icon}" style="font-size: 16px;"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes slideOutRight {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100px);
        }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast);
          }
          if (document.head.contains(style)) {
            document.head.removeChild(style);
          }
        }, 300);
      }
    }, 3000);
  }
}