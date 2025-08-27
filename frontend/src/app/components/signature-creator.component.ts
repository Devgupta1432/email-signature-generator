import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signature-creator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="signature-creator">
      <div class="editor-layout">
        <!-- Left Sidebar -->
        <div class="sidebar">
          <div class="sidebar-header">
            <div class="logo">
              <div class="logo-icon"></div>
              <span>CUSTOM<br>ESIGNATURE</span>
            </div>
          </div>
          
          <div class="sidebar-nav">
            <div class="nav-item" [class.active]="activeTab === 'logo'" (click)="setActiveTab('logo')">
              <div class="nav-icon logo-icon-nav"></div>
              <span>Logo/Image</span>
            </div>
            <div class="nav-item" [class.active]="activeTab === 'info'" (click)="setActiveTab('info')">
              <div class="nav-icon info-icon"></div>
              <span>Info / Style</span>
            </div>
            <div class="nav-item" [class.active]="activeTab === 'social'" (click)="setActiveTab('social')">
              <div class="nav-icon social-iconn"></div>
              <span>Social</span>
            </div>
            <div class="nav-item" [class.active]="activeTab === 'banner'" (click)="setActiveTab('banner')">
              <div class="nav-icon banner-icon"></div>
              <span>Banner</span>
            </div>
            <div class="nav-item" [class.active]="activeTab === 'layouts'" (click)="setActiveTab('layouts')">
              <div class="nav-icon layouts-icon"></div>
              <span>Layouts</span>
            </div>
          </div>
          
          <div class="sidebar-footer">
            <button class="back-btn" (click)="goHome()">
              <i class="fas fa-arrow-left"></i>
              Back
            </button>
          </div>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <!-- Logo/Images Tab -->
          <div *ngIf="activeTab === 'logo'" class="content-section">
            <div class="section-header">
              <div class="section-icon"></div>
              <h2>Logo/Images</h2>
            </div>
            
            <div class="upload-section">
              <h3>Upload logo</h3>
              <div class="upload-area" (click)="logoInput.click()">
                <input #logoInput type="file" accept="image/*" (change)="onLogoSelect($event)" style="display: none;">
                <div *ngIf="!signatureData.logoUrl" class="upload-placeholder">
                  <div class="upload-icon"></div>
                  <p><strong>Upload your image here, or browse</strong></p>
                  <span>Supports: PNG, SVG, JPG, JPEG</span>
                </div>
                <div *ngIf="signatureData.logoUrl" class="uploaded-image">
                  <img [src]="signatureData.logoUrl" alt="Logo" class="preview-logo">
                  <p>Click to change logo</p>
                </div>
              </div>
            </div>
            
            <div class="profile-section">
              <div class="profile-header">
                <h3>Profile Picture</h3>
                <label class="toggle-switch">
                  <input type="checkbox" [(ngModel)]="showProfilePicture">
                  <span class="slider"></span>
                </label>
              </div>
              
              <div class="upload-area" *ngIf="showProfilePicture" (click)="profileInput.click()">
                <input #profileInput id="profileInput" type="file" accept="image/*" (change)="onProfileSelect($event)" style="display: none;">
                <div *ngIf="!signatureData.profileUrl" class="upload-placeholder">
                  <div class="upload-icon"></div>
                  <p><strong>Upload your image here, or browse</strong></p>
                  <span>Supports: PNG, SVG, JPG, JPEG</span>
                </div>
                <div *ngIf="signatureData.profileUrl" class="uploaded-image">
                  <img [src]="signatureData.profileUrl" alt="Profile" class="preview-logo">
                  <p>Click to change image</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Info/Style Tab -->
          <div *ngIf="activeTab === 'info'" class="content-section">
            <div class="section-header">
              <div class="section-icon info-header-icon"></div>
              <h2>Personal Information</h2>
            </div>
            
            <div class="form-grid">
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" [(ngModel)]="signatureData.fullName" placeholder="Enter your full name" class="form-input">
              </div>
              
              <div class="form-group">
                <label>Job Title</label>
                <input type="text" [(ngModel)]="signatureData.jobTitle" placeholder="Your job title" class="form-input">
              </div>
              
              <div class="form-group">
                <label>Company</label>
                <input type="text" [(ngModel)]="signatureData.company" placeholder="Company name" class="form-input">
              </div>
              
              <div class="form-group">
                <label>Email</label>
                <input type="email" [(ngModel)]="signatureData.email" placeholder="your@email.com" class="form-input">
              </div>
              
              <div class="form-group">
                <label>Phone</label>
                <input type="tel" [(ngModel)]="signatureData.phone" placeholder="+1 (555) 123-4567" class="form-input">
              </div>
              
              <div class="form-group">
                <label>Website</label>
                <input type="url" [(ngModel)]="signatureData.website" placeholder="https://yourwebsite.com" class="form-input">
              </div>
              
              <div class="form-group">
                <label>Company Tagline</label>
                <input type="text" [(ngModel)]="signatureData.tagline" placeholder="Your company tagline" class="form-input">
              </div>
              
              <div class="form-group">
                <label>Background Color</label>
                <input type="color" [(ngModel)]="signatureData.backgroundColor" class="form-input color-input">
              </div>
              
              <div class="form-group">
                <label>Font Color</label>
                <input type="color" [(ngModel)]="signatureData.fontColor" class="form-input color-input">
              </div>
            </div>
          </div>
          
          <!-- Other tabs content -->
          <div *ngIf="activeTab === 'social'" class="content-section">
            <div class="section-header">
              <div class="section-icon social-header-icon"></div>
              <h2>Social Media</h2>
            </div>
            
            <div class="form-grid">
              <div class="form-group">
                <label>LinkedIn</label>
                <input type="url" [(ngModel)]="signatureData.linkedin" placeholder="https://linkedin.com/in/yourprofile" class="form-input">
              </div>
              
              <div class="form-group">
                <label>Twitter</label>
                <input type="url" [(ngModel)]="signatureData.twitter" placeholder="https://twitter.com/yourusername" class="form-input">
              </div>
              
              <div class="form-group">
                <label>Facebook</label>
                <input type="url" [(ngModel)]="signatureData.facebook" placeholder="https://facebook.com/yourpage" class="form-input">
              </div>
            </div>
          </div>
          
          <div *ngIf="activeTab === 'banner'" class="content-section">
            <div class="section-header">
              <h2>Banner Options</h2>
            </div>
            <p>Banner customization options coming soon...</p>
          </div>
          
          <div *ngIf="activeTab === 'layouts'" class="content-section">
            <div class="section-header">
              <h2>Layout Templates</h2>
            </div>
            
            <div class="template-grid">
              <div class="template-card" 
                   *ngFor="let template of templates" 
                   [class.active]="selectedTemplate === template.id"
                   (click)="selectTemplate(template.id)">
                <div class="template-preview" [ngClass]="'preview-' + template.id">
                  <span>{{ template.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Preview Panel -->
        <div class="preview-panel">
          <div class="preview-header">
            <div class="signature-brand">
              <div class="brand-logo"></div>
              <div class="brand-info">
                <div class="brand-name">Custom Esignature</div>
                <div class="brand-email">@ john@email@example.com</div>
              </div>
            </div>
          </div>
          
          <div class="preview-content">
            <div class="email-context">
              <div class="email-greeting">Hey John,</div>
              <div class="email-spacing"></div>
              <div class="email-closing">Best,</div>
            </div>
            
            <div class="signature-preview" [style.background-color]="signatureData.backgroundColor">
              <!-- Template 1 -->
              <div class="temp1" *ngIf="selectedTemplate === 1">
                <div class="temp1-signature-wrapper">
                  <!-- Left Side -->
                  <div class="temp1-left-section">
                    <div class="temp1-profile-img">
                      <img [src]="signatureData.logoUrl || 'https://via.placeholder.com/120'" alt="Profile Image">
                    </div>
                    <div class="temp1-name">{{ signatureData.fullName || 'Your name' }}</div>
                    <div class="temp1-title">{{ signatureData.jobTitle || 'PROJECT MANAGER' }}</div>
                  </div>

                  <!-- Right Side -->
                  <div class="temp1-right-section">
                    <div class="temp1-company-name">{{ signatureData.company || 'COMPANY NAME' }}</div>
                    <div class="temp1-company-tagline">{{ signatureData.tagline || 'COMPANY TAG LINE' }}</div>

                    <div class="temp1-contact-item">
                      <i class="fas fa-phone-alt"></i>
                      <span>{{ signatureData.phone || '+123-456-7890' }}</span>
                    </div>
                    <div class="temp1-contact-item">
                      <i class="fas fa-globe"></i>
                      <span>{{ signatureData.website || 'www.reallygreatsite.com' }}</span>
                    </div>
                    <div class="temp1-contact-item">
                      <i class="fas fa-envelope"></i>
                      <span>{{ signatureData.email || 'hello@reallygreatsite.com' }}</span>
                    </div>

                    <div class="temp1-social-icons">
                      <a *ngIf="signatureData.facebook" [href]="signatureData.facebook" target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg">
                      </a>
                      <a *ngIf="signatureData.twitter" [href]="signatureData.twitter" target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg">
                      </a>
                      <a *ngIf="signatureData.linkedin" [href]="signatureData.linkedin" target="_blank">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png">
                      </a>
                    </div>
                  </div>
                </div>
              </div>



              <!-- Temp2 Template (Template 2) -->
<div class="signature-wrapper" *ngIf="selectedTemplate === 2" 
     [style.background-color]="signatureData.backgroundColor || '#f9f6f4'">

  <!-- Left side: profile image -->
  <div class="signature-left">
    <img [src]="signatureData.profileUrl || 'https://via.placeholder.com/150x150'"
         alt="Profile Picture" class="profile-img">
  </div>

  <!-- Right side: name, designation, and contacts -->
  <div class="signature-right">
    <div class="name" [style.color]="signatureData.fontColor || '#000'">
      {{ signatureData.fullName || 'Dev Gupta' }}
    </div>
    <div class="designation" [style.color]="signatureData.fontColor || '#000'">
      {{ signatureData.jobTitle || 'UI/UX DESIGNER' }}
    </div>

    <hr class="divider">

    <div class="temp2-contact-wrapper">
      <div class="temp2-social-icons" *ngIf="signatureData.linkedin || signatureData.twitter || signatureData.facebook">
        <a *ngIf="signatureData.linkedin" [href]="signatureData.linkedin" target="_blank" class="temp2-social-link">
          <i class="fab fa-linkedin-in"></i>
        </a>
        <a *ngIf="signatureData.twitter" [href]="signatureData.twitter" target="_blank" class="temp2-social-link">
          <i class="fab fa-twitter"></i>
        </a>
        <a *ngIf="signatureData.facebook" [href]="signatureData.facebook" target="_blank" class="temp2-social-link">
          <i class="fab fa-facebook-f"></i>
        </a>
      </div>
      <div class="contact-list">
        <div class="contact-item">
          <i class="fas fa-phone"></i>
          <span>{{ signatureData.phone || '+123-456-7890' }}</span>
        </div>
        <div class="contact-item">
          <i class="fas fa-envelope"></i>
          <span>{{ signatureData.email || 'hello@reallygreatsite.com' }}</span>
        </div>
        <div class="contact-item">
          <i class="fas fa-globe"></i>
          <span>{{ signatureData.website || 'www.reallygreatsite.com' }}</span>
        </div>
      </div>
    </div>
  </div>
</div>


              <!-- Template 3 - Professional SVG Design -->
              <svg *ngIf="selectedTemplate === 3" class="template3-svg" xmlns="http://www.w3.org/2000/svg" width="600" height="180" viewBox="0 0 600 180" preserveAspectRatio="xMidYMid meet">
                
                <!-- Background -->
                <rect x="0" width="600" y="0" height="180" 
                      [attr.fill]="signatureData.backgroundColor || '#ffffff'" stroke="#e5e7eb" stroke-width="1"/>
                
                <!-- Left Section -->
                <g>
                  <!-- Name -->
                  <text x="25" y="40" [attr.fill]="signatureData.fontColor || '#1f2937'" 
                        font-family="'Segoe UI', Arial, sans-serif" font-size="22" font-weight="600">
                    {{ signatureData.fullName || 'Alex Chen' }}
                  </text>
                  
                  <!-- Job Title -->
                  <text x="25" y="62" [attr.fill]="signatureData.primaryColor || '#6366f1'" 
                        font-family="'Segoe UI', Arial, sans-serif" font-size="14" font-weight="500">
                    {{ signatureData.jobTitle || 'Creative Director' }}
                  </text>
                  
                  <!-- Company -->
                  <text x="25" y="82" [attr.fill]="signatureData.fontColor || '#6b7280'" 
                        font-family="'Segoe UI', Arial, sans-serif" font-size="13">
                    {{ signatureData.company || 'Design Studio' }}
                  </text>
                  
                  <!-- Divider Line -->
                  <line x1="25" y1="95" x2="280" y2="95" stroke="#e5e7eb" stroke-width="1"/>
                  
                  <!-- Contact Info -->
                  <g>
                    <!-- Email -->
                    <rect x="25" y="108" width="16" height="16" rx="2" [attr.fill]="signatureData.primaryColor || '#6366f1'" opacity="0.1"/>
                    <text x="33" y="119" [attr.fill]="signatureData.primaryColor || '#6366f1'" font-family="Arial" font-size="10" text-anchor="middle">✉</text>
                    <text x="50" y="119" [attr.fill]="signatureData.fontColor || '#374151'" 
                          font-family="'Segoe UI', Arial, sans-serif" font-size="12">
                      {{ signatureData.email || 'alex@designstudio.com' }}
                    </text>
                    
                    <!-- Phone -->
                    <rect x="25" y="130" width="16" height="16" rx="2" [attr.fill]="signatureData.primaryColor || '#6366f1'" opacity="0.1"/>
                    <text x="33" y="141" [attr.fill]="signatureData.primaryColor || '#6366f1'" font-family="Arial" font-size="10" text-anchor="middle">📞</text>
                    <text x="50" y="141" [attr.fill]="signatureData.fontColor || '#374151'" 
                          font-family="'Segoe UI', Arial, sans-serif" font-size="12">
                      {{ signatureData.phone || '+1 (555) 987-6543' }}
                    </text>
                    
                    <!-- Website -->
                    <rect x="25" y="152" width="16" height="16" rx="2" [attr.fill]="signatureData.primaryColor || '#6366f1'" opacity="0.1"/>
                    <text x="33" y="163" [attr.fill]="signatureData.primaryColor || '#6366f1'" font-family="Arial" font-size="10" text-anchor="middle">🌐</text>
                    <text x="50" y="163" [attr.fill]="signatureData.fontColor || '#374151'" 
                          font-family="'Segoe UI', Arial, sans-serif" font-size="12">
                      {{ signatureData.website || 'www.designstudio.com' }}
                    </text>
                  </g>
                </g>
                
                <!-- Right Section - Logo Area -->
                <g>
                  <!-- Logo Background -->
                  <rect x="450" y="30" width="120" height="60" rx="8" [attr.fill]="signatureData.primaryColor || '#6366f1'" opacity="0.05" stroke="#e5e7eb" stroke-width="1"/>
                  
                  <!-- Company Logo -->
                  <image *ngIf="signatureData.logoUrl" 
                         [attr.href]="signatureData.logoUrl" 
                         x="460" y="40" width="100" height="40" 
                         preserveAspectRatio="xMidYMid meet"/>
                  
                  <!-- Company Name (if no logo) -->
                  <text *ngIf="!signatureData.logoUrl" x="510" y="65" [attr.fill]="signatureData.primaryColor || '#6366f1'" 
                        font-family="'Segoe UI', Arial, sans-serif" font-size="16" font-weight="600" text-anchor="middle">
                    {{ signatureData.company || 'LOGO' }}
                  </text>
                  
                  <!-- Social Links -->
                  <g *ngIf="signatureData.linkedin || signatureData.twitter || signatureData.facebook">
                    <circle *ngIf="signatureData.linkedin" cx="470" cy="120" r="12" [attr.fill]="signatureData.primaryColor || '#0077b5'" opacity="0.9"/>
                    <text *ngIf="signatureData.linkedin" x="470" y="125" fill="white" font-family="Arial" font-size="10" text-anchor="middle">in</text>
                    
                    <circle *ngIf="signatureData.twitter" cx="495" cy="120" r="12" [attr.fill]="signatureData.primaryColor || '#1da1f2'" opacity="0.9"/>
                    <text *ngIf="signatureData.twitter" x="495" y="125" fill="white" font-family="Arial" font-size="10" text-anchor="middle">tw</text>
                    
                    <circle *ngIf="signatureData.facebook" cx="520" cy="120" r="12" [attr.fill]="signatureData.primaryColor || '#4267b2'" opacity="0.9"/>
                    <text *ngIf="signatureData.facebook" x="520" y="125" fill="white" font-family="Arial" font-size="10" text-anchor="middle">fb</text>
                  </g>
                </g>
              </svg>


              <!-- Creative Template (Template 4) -->
              <div class="signature-card creative-template" *ngIf="selectedTemplate === 4">
                <div class="creative-layout">
                  <div class="creative-left">
                    <div class="creative-info">
                      <div class="creative-name">{{ signatureData.fullName }}</div>
                      <div class="creative-title">{{ signatureData.jobTitle }}</div>
                      <div class="creative-company">{{ signatureData.company }}</div>
                      <div class="creative-contacts">
                        <span *ngIf="signatureData.email">{{ signatureData.email }}</span>
                        <span *ngIf="signatureData.phone"> • {{ signatureData.phone }}</span>
                      </div>
                      <div class="creative-social" *ngIf="signatureData.linkedin || signatureData.twitter || signatureData.facebook">
                        <a *ngIf="signatureData.linkedin" [href]="signatureData.linkedin" target="_blank" class="social-link creative-linkedin">
                          <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a *ngIf="signatureData.twitter" [href]="signatureData.twitter" target="_blank" class="social-link creative-twitter">
                          <i class="fab fa-twitter"></i>
                        </a>
                        <a *ngIf="signatureData.facebook" [href]="signatureData.facebook" target="_blank" class="social-link creative-facebook">
                          <i class="fab fa-facebook-f"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="creative-logo">
                    <img [src]="signatureData.logoUrl || 'assets/default-logo.png'" alt="Company Logo">
                  </div>
                </div>
              </div>

              <!-- Minimal Template (Template 5) -->
              <div class="signature-card minimal-template" *ngIf="getTemplateStyle() === 'minimal'">
                <div class="minimal-content">
                  <div class="minimal-name">{{ signatureData.fullName }}</div>
                  <div class="minimal-title">{{ signatureData.jobTitle }}</div>
                  <div class="minimal-company">{{ signatureData.company }}</div>
                  <div class="minimal-divider"></div>
                  <div class="minimal-contacts">
                    <div *ngIf="signatureData.email">{{ signatureData.email }}</div>
                    <div *ngIf="signatureData.phone">{{ signatureData.phone }}</div>
                    <div *ngIf="signatureData.website">{{ signatureData.website }}</div>
                  </div>
                </div>
              </div>

              <!-- Tech Template (Template 5) -->
              <div class="signature-card tech-template" *ngIf="getTemplateStyle() === 'tech'">
                <div class="tech-layout">
                  <div class="tech-left">
                    <div class="tech-avatar">
                      <img [src]="signatureData.profileUrl || 'assets/default-profile.jpg'" alt="Profile" class="tech-profile">
                    </div>
                  </div>
                  <div class="tech-right">
                    <div class="tech-name">{{ signatureData.fullName }}</div>
                    <div class="tech-title">{{ signatureData.jobTitle }}</div>
                    <div class="tech-company">{{ signatureData.company }}</div>
                    <div class="tech-contact-grid">
                      <div class="tech-contact" *ngIf="signatureData.email">
                        <i class="fas fa-at"></i> {{ signatureData.email }}
                      </div>
                      <div class="tech-contact" *ngIf="signatureData.phone">
                        <i class="fas fa-mobile-alt"></i> {{ signatureData.phone }}
                      </div>
                      <div class="tech-contact" *ngIf="signatureData.website">
                        <i class="fas fa-link"></i> {{ signatureData.website }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Elegant Template (Template 6) -->
              <div class="signature-card elegant-template" *ngIf="getTemplateStyle() === 'elegant'">
                <div class="elegant-header">
                  <div class="elegant-name">{{ signatureData.fullName }}</div>
                  <div class="elegant-title">{{ signatureData.jobTitle }}</div>
                </div>
                <div class="elegant-body">
                  <div class="elegant-company">{{ signatureData.company }}</div>
                  <div class="elegant-contacts">
                    <div class="elegant-contact" *ngIf="signatureData.email">
                      <span class="contact-label">Email:</span> {{ signatureData.email }}
                    </div>
                    <div class="elegant-contact" *ngIf="signatureData.phone">
                      <span class="contact-label">Phone:</span> {{ signatureData.phone }}
                    </div>
                    <div class="elegant-contact" *ngIf="signatureData.website">
                      <span class="contact-label">Web:</span> {{ signatureData.website }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="preview-footer">
            <div class="terms-checkbox">
              <input type="checkbox" id="terms" [(ngModel)]="agreedToTerms">
              <label for="terms">I agree to Terms Of Use and to Privacy Policy</label>
            </div>
            <button class="btn-back" (click)="goHome()">← Back to Templates</button>
            <button class="btn-use" (click)="useSignature()" [class.locked]="!authService.isAuthenticated()">
              <i class="fas" [class.fa-check]="authService.isAuthenticated()" [class.fa-lock]="!authService.isAuthenticated()"></i>
              {{ authService.isAuthenticated() ? 'Use This Signature' : 'Login to Use Signature' }}
            </button>
          </div>

          <!-- Copy Modal -->
          <div class="copy-modal" *ngIf="showCopyModal">
            <div class="copy-modal-content">
              <h3>Copy Signature</h3>
              <p>Your signature is ready! Click the button below to copy it to your clipboard, then paste it into your email client.</p>
              <div class="copy-modal-buttons">
                <button class="btn-copy" (click)="copySignatureToClipboard()">
                  <i class="fas fa-copy"></i> Copy to Clipboard
                </button>
                <button class="btn-cancel" (click)="closeCopyModal()">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .signature-creator {
      min-height: 100vh;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%);
      font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
      position: relative;
      color: #1f2937;
    }

    .signature-creator::before {
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

    .editor-layout {
      display: grid;
      grid-template-columns: 200px 1fr 600px;
      height: 100vh;
      gap: 0.5rem;
      padding: 0.5rem;
    }

    /* Sidebar */
    .sidebar {
      background: rgba(255, 255, 255, 0.98);
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 25px rgba(0, 0, 0, 0.08);
      backdrop-filter: blur(30px);
      border: 1px solid rgba(255, 255, 255, 0.4);
      overflow: hidden;
    }

    .sidebar-header {
      padding: 1rem 1rem;
      border-bottom: 1px solid rgba(102, 126, 234, 0.1);
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.85rem;
      font-weight: 700;
      color: #1f2937;
      letter-spacing: -0.5px;
      line-height: 1.2;
    }

    .logo-icon {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .sidebar-nav {
      flex: 1;
      padding: 1rem 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 0.875rem;
      font-weight: 600;
      color: #64748b;
      position: relative;
      border-radius: 12px;
      margin: 0 0.5rem;
    }

    .nav-item:hover {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      color: #1f2937;
      transform: translateX(2px);
    }

    .nav-item.active {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      color: #667eea;
      border-right: 4px solid #667eea;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
    }

    .nav-icon {
      width: 18px;
      height: 18px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .nav-item:hover .nav-icon {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .logo-icon-nav { background: linear-gradient(135deg, #667eea, #764ba2); }
    .info-icon { background: linear-gradient(135deg, #10b981, #059669); }
    .social-icon { background: linear-gradient(135deg, #667eea, #764ba2); }
    .banner-icon { background: linear-gradient(135deg, #f59e0b, #d97706); }
    .layouts-icon { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }

    .sidebar-footer {
      padding: 1rem;
      border-top: 1px solid #e2e8f0;
    }

    .back-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: none;
      border: none;
      color: #6b7280;
      font-size: 0.875rem;
      cursor: pointer;
      padding: 0.5rem;
    }

    /* Main Content */
    .main-content {
      background: rgba(255, 255, 255, 0.98);
      border-radius: 24px;
      padding: 2rem;
      overflow: hidden;
      position: relative;
      backdrop-filter: blur(30px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 25px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.4);
      height: calc(100vh - 1rem);
    }

    .main-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, #667eea, #764ba2, transparent);
      border-radius: 20px 20px 0 0;
    }

    .content-section {
      max-width: 100%;
      height: 100%;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(102, 126, 234, 0.15);
    }

    .section-header h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
      letter-spacing: -0.5px;
      line-height: 1.3;
    }

    .section-icon {
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .info-header-icon { background: linear-gradient(135deg, #10b981, #059669); }
    .social-header-icon { background: linear-gradient(135deg, #667eea, #764ba2); }

    .upload-section {
      margin-bottom: 1.5rem;
    }

    .upload-section h3 {
      font-size: 1rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 1rem;
    }

    .upload-area {
      border: 2px dashed rgba(102, 126, 234, 0.3);
      border-radius: 12px;
      padding: 2rem 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      background: rgba(255, 255, 255, 0.8);
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(10px);
    }

    .upload-area::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .upload-area:hover {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.05);
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);
    }

    .upload-area:hover::before {
      opacity: 1;
    }

    .upload-placeholder {
      color: #6b7280;
    }

    .upload-icon {
      width: 48px;
      height: 32px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      margin: 0 auto 1rem;
      border-radius: 12px;
      position: relative;
      box-shadow: 0 6px 18px rgba(102, 126, 234, 0.4);
      transition: all 0.3s ease;
    }

    .upload-area:hover .upload-icon {
      transform: scale(1.05);
      box-shadow: 0 8px 25px rgba(14, 165, 233, 0.4);
    }

    .upload-icon::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 12px solid white;
    }

    .upload-placeholder p {
      margin: 0 0 0.5rem;
      font-size: 1rem;
    }

    .upload-placeholder span {
      font-size: 0.875rem;
      color: #9ca3af;
    }

    .uploaded-image {
      text-align: center;
    }

    .preview-logo {
      max-width: 120px;
      max-height: 80px;
      object-fit: contain;
      border-radius: 8px;
      margin-bottom: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .uploaded-image p {
      font-size: 0.875rem;
      color: #6b7280;
      margin: 0;
    }

    .profile-section {
      margin-bottom: 2rem;
    }

    .profile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .profile-header h3 {
      font-size: 1rem;
      font-weight: 500;
      color: #374151;
      margin: 0;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 44px;
      height: 24px;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #cbd5e1;
      transition: 0.3s;
      border-radius: 24px;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: 0.3s;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    }

    input:checked + .slider {
      background: linear-gradient(135deg, #667eea, #764ba2);
    }

    input:checked + .slider:before {
      transform: translateX(20px);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      font-size: 0.875rem;
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.5rem;
      letter-spacing: -0.2px;
    }

    .form-input {
      padding: 0.875rem 1.25rem;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      font-size: 0.9rem;
      font-weight: 500;
      background: rgba(255, 255, 255, 0.95);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      backdrop-filter: blur(10px);
      color: #1e293b;
    }

    .form-input:focus {
      outline: none;
      border-color: #4f46e5;
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.15), 0 8px 25px rgba(79, 70, 229, 0.2);
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 1);
    }

    .color-input {
      height: 56px;
      padding: 0.5rem;
      cursor: pointer;
      border-radius: 12px;
      border: 2px solid #e2e8f0;
      transition: all 0.3s ease;
    }

    .color-input:hover {
      border-color: #cbd5e1;
      transform: translateY(-1px);
    }

    .template-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }

    .template-card {
      border: 2px solid #e2e8f0;
      border-radius: 16px;
      padding: 1.5rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(15px);
      font-weight: 600;
      color: #1e293b;
    }

    .template-card:hover {
      border-color: #4f46e5;
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(79, 70, 229, 0.2);
    }

    .template-card.active {
      border-color: #4f46e5;
      background: rgba(79, 70, 229, 0.1);
      box-shadow: 0 8px 25px rgba(79, 70, 229, 0.25);
      color: #4f46e5;
    }

    /* Preview Panel */
    .preview-panel {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 0;

      flex-direction: column;
      box-shadow: -8px 0 32px rgba(0, 0, 0, 0.15);
      position: relative;
      overflow: hidden;
      height: calc(100vh - 1rem);
    }

    .preview-panel::before {
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

    .preview-header {
      background: rgba(255, 255, 255, 0.95);
      padding: 1rem;
      border-bottom: none;
      position: relative;
      backdrop-filter: blur(20px);
    }

    .preview-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent);
    }

    .signature-brand {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 16px;
      box-shadow: 
        0 8px 32px rgba(102, 126, 234, 0.15),
        0 0 0 1px rgba(255, 255, 255, 0.3);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.4);
    }

    .brand-logo {
      width: 42px;
      height: 42px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      position: relative;
      overflow: hidden;
    }

    .brand-logo::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: logoShine 3s ease-in-out infinite;
    }

    @keyframes logoShine {
      0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
      50% { transform: translateX(100%) translateY(100%) rotate(45deg); }
      100% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
    }

    .brand-name {
      font-weight: 700;
      font-size: 1rem;
      color: #1f2937;
      letter-spacing: -0.02em;
    }

    .brand-email {
      font-size: 0.85rem;
      color: #667eea;
      font-weight: 500;
    }

    .preview-content {
      background: rgba(255, 255, 255, 0.95);
      margin: 1rem;
      border-radius: 16px;
      padding: 1rem;
      box-shadow: 
        0 16px 32px rgba(102, 126, 234, 0.15),
        0 0 0 1px rgba(255, 255, 255, 0.6),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
      position: relative;
      flex: 1;
      overflow: hidden;
      backdrop-filter: blur(30px);
    }

    .preview-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, #667eea, #764ba2, transparent);
      border-radius: 20px 20px 0 0;
    }

    .preview-content::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.04) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.04) 0%, transparent 50%);
      border-radius: 20px;
      pointer-events: none;
    }

    .email-context {
      opacity: 0.5;
      margin-bottom: 1rem;
      position: relative;
      z-index: 1;
    }

    .email-greeting {
      font-size: 1rem;
      color: #1f2937;
      margin-bottom: 1rem;
      font-weight: 500;
      position: relative;
    }

    .email-greeting::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 30px;
      height: 2px;
      background: linear-gradient(90deg, #0ea5e9, transparent);
      border-radius: 1px;
    }

    .email-spacing {
      height: 2rem;
      position: relative;
    }

    .email-spacing::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(14, 165, 233, 0.1), transparent);
    }

    .email-closing {
      font-size: 1rem;
      color: #1f2937;
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .signature-preview {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 1rem;
      border: 1px solid rgba(0, 0, 0, 0.08);
      position: relative;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .signature-preview:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    }

    /* Template-specific styles */
    .modern-template {
      /* Default modern template styles (existing) */
    }

    .corporate-template {
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
    }

    .corporate-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    }

    .company-logo-large {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-large {
      max-width: 40px;
      max-height: 40px;
      object-fit: contain;
    }

    .company-name-large {
      font-size: 1.2rem;
      font-weight: 700;
      color: white;
    }

    .executive-name {
      font-size: 1.1rem;
      font-weight: 700;
      color: white;
      margin-bottom: 0.25rem;
    }

    .executive-title {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 0.75rem;
    }

    .contact-details {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      color: rgba(255, 255, 255, 0.9);
    }

    .contact-item i {
      width: 14px;
      color: rgba(255, 255, 255, 0.7);
    }

    .signature-card.creative-template {
      max-width: 600px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: 'Arial', sans-serif;
      background: #fff;
      padding: 12px 16px;
    }

    .creative-layout {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .creative-left {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .creative-avatar img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: cover;
    }

    .creative-info {
      display: flex;
      flex-direction: column;
    }

    .creative-name {
      font-size: 18px;
      font-weight: bold;
      color: #222;
    }

    .creative-title {
      font-size: 14px;
      color: #666;
    }

    .creative-company {
      font-size: 14px;
      font-weight: 600;
      margin-top: 2px;
      color: #333;
    }

    .creative-contacts {
      font-size: 13px;
      color: #444;
      margin-top: 4px;
    }

    .creative-social {
      margin-top: 6px;
    }

    .creative-social .social-link {
      margin-right: 8px;
      text-decoration: none;
      font-size: 14px;
      color: #555;
    }

    .creative-social .creative-linkedin { color: #0077b5; }
    .creative-social .creative-twitter { color: #1da1f2; }
    .creative-social .creative-facebook { color: #3b5998; }

    .creative-logo img {
      max-width: 100px;
      height: auto;
      object-fit: contain;
    }



    .minimal-template {
      background: white;
      border: 1px solid #e2e8f0;
      padding: 1.5rem;
      border-radius: 8px;
    }

    .minimal-name {
      font-size: 1.1rem;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 0.25rem;
    }

    .minimal-title {
      font-size: 0.9rem;
      color: #6b7280;
      margin-bottom: 0.25rem;
    }

    .minimal-company {
      font-size: 0.9rem;
      color: #374151;
      font-weight: 500;
      margin-bottom: 0.75rem;
    }

    .minimal-divider {
      width: 40px;
      height: 2px;
      background: #e2e8f0;
      margin-bottom: 0.75rem;
    }

    .minimal-contacts {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .minimal-contacts div {
      font-size: 0.85rem;
      color: #6b7280;
    }

    .tech-template {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 16px;
      position: relative;
    }

    .tech-template::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 0 16px 0 60px;
    }

    .tech-layout {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .tech-avatar {
      position: relative;
      z-index: 1;
    }

    .tech-profile {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .tech-name {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }

    .tech-title {
      font-size: 0.85rem;
      opacity: 0.9;
      margin-bottom: 0.25rem;
    }

    .tech-company {
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .tech-contact-grid {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .tech-contact {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      opacity: 0.9;
    }

    .tech-contact i {
      width: 12px;
      font-size: 0.75rem;
    }

    .elegant-template {
      background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
      color: white;
      padding: 1.5rem;
      border-radius: 12px;
      text-align: center;
    }

    .elegant-header {
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .elegant-name {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
      letter-spacing: 0.5px;
    }

    .elegant-title {
      font-size: 0.9rem;
      opacity: 0.9;
      font-style: italic;
    }

    .elegant-company {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      color: rgba(255, 255, 255, 0.95);
    }

    .elegant-contacts {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      align-items: center;
    }

    .elegant-contact {
      font-size: 0.85rem;
      opacity: 0.9;
    }

    .contact-label {
      font-weight: 600;
      opacity: 0.7;
    }

    /* Template 3 SVG Styles */
    .template3-svg {
      width: 100%;
      height: auto;
      display: block;
      max-width: 420px;
    }

    .template3-name {
      font-family: Arial, sans-serif;
      font-size: 18px;
      font-weight: bold;
    }

    .template3-title {
      font-family: Arial, sans-serif;
      font-size: 12px;
    }

    .template3-contact {
      font-family: Arial, sans-serif;
      font-size: 10px;
    }

    .template3-company {
      font-family: Arial, sans-serif;
      font-size: 14px;
      font-weight: bold;
    }

    .template3-icon {
      font-family: Arial;
      font-size: 8px;
      text-anchor: middle;
      dominant-baseline: middle;
    }

    .template3-icon-bg {
      opacity: 0.2;
    }

    .template3-logo-bg {
      opacity: 0.1;
    }

    .template3-logo {
      shape-rendering: crispEdges;
    }

    /* SVG Template Styles */
    .svg-template-container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border-radius: 12px;
      padding: 1rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .svg-signature-wrapper {
      position: relative;
    }

    .editable-svg {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }

    .profile-circle {
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .profile-circle:hover {
      stroke-width: 3;
      stroke: #764ba2;
    }

    .editable-text {
      cursor: text;
      user-select: none;
    }

    .social-circle {
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .social-circle:hover {
      r: 10;
      opacity: 0.8;
    }

    .profile-upload-hint {
      position: absolute;
      top: 50%;
      left: 71px;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .upload-hint-circle {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: rgba(102, 126, 234, 0.1);
      border: 2px dashed #667eea;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      pointer-events: all;
    }

    .upload-hint-circle:hover {
      background: rgba(102, 126, 234, 0.2);
      border-color: #764ba2;
      transform: scale(1.05);
    }

    .upload-hint-circle i {
      font-size: 16px;
      color: #667eea;
      margin-bottom: 2px;
    }

    .upload-hint-circle span {
      font-size: 8px;
      color: #667eea;
      text-align: center;
      font-weight: 500;
    }

    /* SVG Template Base Styles */
    .svg-template-base {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
      min-width: 350px;
    }

    .profile-circle-container {
      position: relative;
      cursor: pointer;
    }

    .profile-circle {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      background-size: cover;
      background-position: center;
    }

    .profile-circle.has-image {
      border-color: rgba(255, 255, 255, 0.5);
    }

    .profile-placeholder {
      font-size: 24px;
      color: rgba(255, 255, 255, 0.7);
    }

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      color: white;
      font-size: 16px;
    }

    .profile-circle-container:hover .profile-overlay {
      opacity: 1;
    }

    .profile-circle-container:hover .profile-circle {
      transform: scale(1.05);
      border-color: rgba(255, 255, 255, 0.8);
    }

    .svg-text-content {
      flex: 1;
    }

    .svg-name {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: white;
    }

    .svg-title {
      font-size: 1rem;
      opacity: 0.9;
      margin-bottom: 0.25rem;
      color: rgba(255, 255, 255, 0.9);
    }

    .svg-company {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 1rem;
      color: rgba(255, 255, 255, 0.95);
    }

    .svg-contacts {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      margin-bottom: 1rem;
    }

    .svg-contact {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.9);
    }

    .svg-contact i {
      width: 14px;
      text-align: center;
      opacity: 0.8;
    }

    .svg-social {
      display: flex;
      gap: 0.5rem;
    }

    .svg-social-link {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .svg-social-link.linkedin {
      background: rgba(0, 119, 181, 0.8);
    }

    .svg-social-link.twitter {
      background: rgba(29, 161, 242, 0.8);
    }

    .svg-social-link.facebook {
      background: rgba(24, 119, 242, 0.8);
    }

    .svg-social-link:hover {
      transform: scale(1.1);
      opacity: 1;
    }

    /* Temp1 Template Styles */
    .temp1-signature {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1.5rem;
      border-radius: 12px;
      color: white;
    }

    /* Temp1 Template Styles */
    .signature-wrapper {

      font-family: Arial, sans-serif;
      display: flex;
      gap:2rem;
      align-items: flex-start;

    }

    .left-section {
      flex: 0 0 200px;
          margin-left: 1rem;
      text-align: center;
      border-right: 2px solid #000;
      padding-right: 20px;
    }

    .profile-img {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid black;
      margin: 0 auto;
    }

    .profile-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .name {
      margin-top: 15px;
      font-size: 18px;
      font-weight: normal;
      color: #000;
    }

    /* Template 2 Name Font Style */
    .signature-wrapper[style*="selectedTemplate === 2"] .name,
    div[class*="signature-wrapper"] .name {
      font-family: 'Abramo', cursive;
    }

    .title {
      font-size: 12px;
      letter-spacing: 2px;
      color: #000;
      margin-top: 5px;
    }

    .right-section {
      flex: 1;
          margin-left: 1rem;
      padding-left: 30px;
    }

    .company-name {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 1rem;
      letter-spacing: 4px;
      color: #000;
    }

    .company-tagline {
      font-size: 12px;
      letter-spacing: 3px;
      margin-bottom: 20px;
      color: #000;
    }

    .contact-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      color: #000;
      font-size: 14px;
    }

    .contact-item i {
      width: 16px;
      margin-right: 10px;
      color: #000;
    }

    .social-icons {
      display: flex;
      gap: 15px;
      margin-top: 20px;
    }
        .social-iconn {
    background: linear-gradient(135deg, #667eea, #764ba2);
    }

    .social-icons img {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }

    /* Temp2 Template Styles */
    .temp2-wrapper {
      display: flex;
      align-items: center;
      padding: 20px;
      font-family: Arial, sans-serif;
    }

    .temp2-left {
      margin-right: 20px;
    }

    .temp2-profile {
      width: 150px;
      height: 150px;
      border-radius: 15px;
      object-fit: cover;
    }

    /* Temp2 Rectangle Profile Image Override */
    .signature-wrapper .profile-img {
      border-radius: 8px !important;
      width: 150px;
      height: 210px;
      min-width: 150px;
      min-height: 210px;
      object-fit: cover;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .temp2-right {
      flex: 1;
    }

    .temp2-name {
      font-family: 'Brush Script MT', cursive;
      font-size: 28px;
      font-weight: normal;
    }

    .temp2-title {
      font-weight: bold;
      letter-spacing: 1px;
      font-size: 14px;
      margin-top: -5px;
    }

    .divider {
border: none;
    border-top: 2px solid;
    margin: 10px -32px;
    opacity: 1;
    }

    .contact-list {
      display: flex;
      flex-direction: column;

    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }

    .contact-item i {
      color: #000;
    }

    /* Template 2 Contact Wrapper */
    .temp2-contact-wrapper {
      display: flex;
      gap: 15px;
      align-items: flex-start;
    }

    /* Template 2 Social Icons */
    .temp2-social-icons {
      display: flex;
      flex-direction: column;
      gap: 13px;
    }

    .temp2-social-link {
      width: 20px;
      height: 20px;
      background: #000;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 10px;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .temp2-social-link:hover {
      transform: scale(1.1);
      opacity: 0.8;
    }

    /* Temp2 Template Styles */
    .temp2-wrapper {
      width: 400px;
      height: 200px;
      font-family: Arial, sans-serif;
      display: flex;
      background-color: #f6f3f2;
      border-radius: 8px;
      overflow: hidden;
    }

    .temp2-left {
      flex: 0 0 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .temp2-profile {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #000;
    }

    .temp2-profile img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .temp2-right {
      flex: 1;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .temp2-name {
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 2px;
      margin-bottom: 15px;
      color: #000;
    }

    .temp2-contact {
      margin-bottom: 10px;
    }

    .temp2-contact-item {
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      font-size: 12px;
      color: #000;
    }

    .temp2-contact-item i {
      width: 14px;
      margin-right: 8px;
      color: #000;
    }

    .temp2-location {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #000;
    }

    .temp2-location i {
      width: 14px;
      margin-right: 8px;
      color: #000;
    }

    /* Temp1 Editable Template Styles */
    .temp1-editable-container {
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border-radius: 12px;
      padding: 1rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .temp1-editable-wrapper {
      position: relative;
    }

    .temp1-editable-svg {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      cursor: default;
    }

    .temp1-profile-circle {
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .temp1-profile-circle:hover {
      stroke-width: 3;
      stroke: rgba(255,255,255,0.8);
      transform: scale(1.05);
    }

    .temp1-layout {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .temp1-left {
      flex: 1;
    }

    .temp1-logo {
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1rem;
    }

    .temp1-logo img {
      max-width: 50px;
      max-height: 50px;
      object-fit: contain;
    }

    .temp1-name {
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .temp1-title {
      font-size: 1rem;
      opacity: 0.9;
      margin-bottom: 1rem;
    }

    .temp1-right {
      flex: 1;
      text-align: right;
    }

    .temp1-company {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .temp1-contacts {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .temp1-contact {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.5rem;
      font-size: 0.9rem;
      opacity: 0.9;
    }

    .temp1-contact i {
      width: 16px;
      text-align: center;
    }

    .temp1-social {
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
    }

    .temp1-social-link {
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .temp1-social-link:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(1.1);
    }

    .signature-card {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      position: relative;
    }

    .card-left {
      display: flex;
      flex-direction: column;
      align-items: center;

    }

    .social-icons {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }

    .social-icon {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
    }

    .globe-icon { background: #6b7280; }

    .linkedin-icon { background: #0077B5; }
    .facebook-icon { background: #1877F2; }
    .youtube-icon { background: #FF0000; }

    .social-icon:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .social-icon::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.5s ease;
    }

    .social-icon:hover::after {
      left: 100%;
    }

    .card-center {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .card-left .company-logo-container {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      min-height: 40px;

    }

    .company-logo-card {
      max-width: 32px;
      max-height: 32px;
      object-fit: contain;
    }

    .signature-info {
      flex: 1;
    }

    .signature-name-card {
      font-weight: 700;
      font-size: 1.1rem;
      color: #1a1a1a;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.25rem;
    }

    .verified-badge {
      color: #1DA1F2;
      font-size: 0.9rem;
    }

    .signature-title-card {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
      font-weight: 400;
    }

    .signature-company-card {
      font-weight: 600;
      color: #1a1a1a;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }

    .signature-contact-card {
      font-size: 0.85rem;
      color: #666;
      line-height: 1.4;
    }

    .signature-contact-card div {
      margin-bottom: 0.2rem;
    }

    .card-right {
      position: relative;
    }

    .profile-image-container {
      position: relative;
      width: 80px;
      height: 80px;
      overflow: hidden;
      border: 2px solid #fff;
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      background: #f0f0f0;
      border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
      animation: morphShape 8s ease-in-out infinite;
      cursor: pointer;
    }

    .profile-image-container::before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
      border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
      animation: morphShape 8s ease-in-out infinite, colorShift 6s linear infinite;
      z-index: -1;
    }

    .profile-image-container::after {
      content: '';
      position: absolute;
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: linear-gradient(45deg, rgba(255, 107, 107, 0.3), rgba(78, 205, 196, 0.3), rgba(69, 183, 209, 0.3));
      border-radius: 50% 20% 80% 30% / 60% 70% 30% 40%;
      animation: morphOuter 10s ease-in-out infinite, glowPulse 4s ease-in-out infinite;
      z-index: -2;
    }

    .profile-image-card {
      width: 100%;
      height: 100%;
      object-fit: cover;
      animation: imageFloat 6s ease-in-out infinite;
      transition: transform 0.3s ease;
    }

    .profile-image-container:hover .profile-image-card {
      transform: scale(1.05) rotate(3deg);
    }

    .profile-image-container:hover {
      animation-play-state: paused;
    }

    @keyframes morphShape {
      0%, 100% { border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%; }
      25% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
      50% { border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%; }
      75% { border-radius: 35% 65% 25% 75% / 60% 35% 65% 40%; }
    }

    @keyframes morphOuter {
      0%, 100% { border-radius: 50% 20% 80% 30% / 60% 70% 30% 40%; }
      33% { border-radius: 70% 30% 30% 70% / 40% 80% 20% 60%; }
      66% { border-radius: 30% 70% 60% 40% / 80% 20% 70% 30%; }
    }

    @keyframes colorShift {
      0% { filter: hue-rotate(0deg); }
      100% { filter: hue-rotate(360deg); }
    }

    @keyframes imageFloat {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-3px) scale(1.02); }
    }

    @keyframes glowPulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(1.1); }
    }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }

    .copy-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .copy-modal-content {
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 400px;
      width: 90%;
    }

    .copy-modal h3 {
      margin: 0 0 1rem 0;
      color: #1f2937;
      font-size: 1.5rem;
    }

    .copy-modal p {
      margin: 0 0 2rem 0;
      color: #6b7280;
      line-height: 1.5;
    }

    .copy-modal-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .btn-copy {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-copy:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
    }

    .btn-cancel {
      background: #f3f4f6;
      color: #6b7280;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-cancel:hover {
      background: #e5e7eb;
    }

    /* Template 1 Specific Styles */
    .temp1-signature-wrapper {
      width: 600px;
      font-family: Arial, sans-serif;
      display: flex;
      align-items: flex-start;
      background-color: white;
    }

    .temp1-left-section {
      flex: 0 0 200px;
      text-align: center;
      border-right: 1px solid #000;
      padding-right: 20px;
    }

    .temp1-profile-img {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid black;
      margin: 0 auto;
    }

    .temp1-profile-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .temp1-name {
      margin-top: 15px;
      font-size: 18px;
      font-weight: normal;
      color: #000;
    }

    .temp1-title {
      font-size: 12px;
      letter-spacing: 2px;
      color: #000;
      margin-top: 5px;
    }

    .temp1-right-section {
      flex: 1;
      padding-left: 30px;
    }

    .temp1-company-name {
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 4px;
      color: #000;
    }

    .temp1-company-tagline {
      font-size: 12px;
      letter-spacing: 3px;
      margin-bottom: 20px;
      color: #000;
    }

    .temp1-contact-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      color: #000;
      font-size: 14px;
    }

    .temp1-contact-item i {
      width: 16px;
      margin-right: 10px;
    }

    .temp1-social-icons {
      display: flex;
      gap: 15px;
      margin-top: 20px;
    }

    .temp1-social-icons img {
      width: 24px;
    }

    .preview-footer {
      background: rgba(255, 255, 255, 0.95);
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      border-top: none;
      position: relative;
      backdrop-filter: blur(20px);
    }

    .preview-footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.2), transparent);
    }

    .btn-back, .btn-use {
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: none;
      position: relative;
      overflow: hidden;
      letter-spacing: -0.01em;
    }

    .btn-back {
      background: rgba(255, 255, 255, 0.9);
      color: #6b7280;
      box-shadow: 0 6px 20px rgba(107, 114, 128, 0.15);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .btn-use {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: white;
      box-shadow: 0 8px 24px rgba(79, 70, 229, 0.4);
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .btn-back:hover {
      background: rgba(255, 255, 255, 1);
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(107, 114, 128, 0.2);
    }

    .btn-use:hover {
      background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
      transform: translateY(-3px);
      box-shadow: 0 16px 40px rgba(102, 126, 234, 0.5);
    }

    .btn-use.locked {
      background: linear-gradient(45deg, #9ca3af, #6b7280);
      cursor: not-allowed;
      opacity: 0.7;
    }

    .btn-use.locked:hover {
      background: linear-gradient(45deg, #9ca3af, #6b7280);
      transform: none;
      box-shadow: none;
    }

    .terms-checkbox {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      color: #6b7280;
      padding: 0.75rem;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 12px;
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .terms-checkbox input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: #0ea5e9;
    }

    @media (max-width: 1024px) {
      .editor-layout {
        grid-template-columns: 1fr;
      }
      
      .sidebar {
        display: none;
      }
      
      .form-grid {
        grid-template-columns: 1fr;
      }
      
      .creative-layout,
      .tech-layout {
        flex-direction: column;
        text-align: center;
        gap: 0.75rem;
      }
      
      .corporate-header {
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
      }
    }
  `]
})
export class SignatureCreatorComponent implements OnInit {
  signatureData = {
    fullName: '',
    jobTitle: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    logoUrl: '',
    profileUrl: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    tagline: '',
    primaryColor: '#667eea',
    backgroundColor: '#ffffff',
    fontColor: '#000000'
  };

  activeTab = 'logo';
  selectedTemplate = 1;
  showProfilePicture = true;
  agreedToTerms = false;
  showCopyModal = false;

  templates = [
    { id: 1, name: 'Temp1' },
    { id: 2, name: 'Corporate' },
    { id: 3, name: 'Creative' },
    { id: 4, name: 'Minimal' },
    { id: 5, name: 'Tech' },
    { id: 6, name: 'Elegant' }
  ];

  templatePresets = {
    1: {
      name: 'Temp1 Template',
      style: 'temp1',
      sampleData: {
        fullName: 'John Doe',
        jobTitle: 'Senior Developer',
        company: 'Tech Company',
        email: 'john.doe@company.com',
        phone: '+1 (555) 123-4567',
        website: 'www.company.com'
      }
    },
    2: {
      name: 'Corporate Executive',
      style: 'corporate',
      sampleData: {
        fullName: 'Michael Brown',
        jobTitle: 'CEO & Founder',
        company: 'StartupHub',
        email: 'michael@startuphub.com',
        phone: '+1 (555) 123-4567',
        website: 'www.startuphub.com'
      }
    },
    3: {
      name: 'Creative Designer',
      style: 'creative',
      sampleData: {
        fullName: 'Alex Chen',
        jobTitle: 'Creative Director',
        company: 'Design Studio',
        email: 'alex@designstudio.com',
        phone: '+1 (555) 987-6543',
        website: 'www.designstudio.com'
      }
    },
    4: {
      name: 'Minimal Clean',
      style: 'minimal',
      sampleData: {
        fullName: 'Emma Wilson',
        jobTitle: 'Product Manager',
        company: 'InnovateCorp',
        email: 'emma@innovatecorp.com',
        phone: '+1 (555) 456-7890',
        website: 'www.innovatecorp.com'
      }
    },
    5: {
      name: 'Tech Startup',
      style: 'tech',
      sampleData: {
        fullName: 'David Kim',
        jobTitle: 'CTO',
        company: 'TechStart',
        email: 'david@techstart.io',
        phone: '+1 (555) 321-0987',
        website: 'www.techstart.io'
      }
    },
    6: {
      name: 'Elegant Professional',
      style: 'elegant',
      sampleData: {
        fullName: 'Lisa Anderson',
        jobTitle: 'Marketing Director',
        company: 'Global Corp',
        email: 'lisa@globalcorp.com',
        phone: '+1 (555) 654-3210',
        website: 'www.globalcorp.com'
      }
    }
  };

  constructor(private router: Router, private route: ActivatedRoute, public authService: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['template']) {
        this.selectedTemplate = parseInt(params['template']);
        this.loadTemplatePreset();
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  selectTemplate(templateId: number) {
    this.selectedTemplate = templateId;
    this.loadTemplatePreset();
  }

  loadTemplatePreset() {
    const preset = this.templatePresets[this.selectedTemplate as keyof typeof this.templatePresets];
    if (preset) {
      this.signatureData = { ...this.signatureData, ...preset.sampleData };
    }
  }

  getTemplateStyle() {
    const preset = this.templatePresets[this.selectedTemplate as keyof typeof this.templatePresets];
    return preset ? preset.style : 'modern';
  }

  onLogoSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.signatureData.logoUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onProfileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.signatureData.profileUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSvgProfileClick() {
    const profileInput = document.querySelector('#profileInput') as HTMLInputElement;
    if (profileInput) {
      profileInput.click();
    }
  }

  useSignature() {
    if (!this.agreedToTerms) {
      alert('Please agree to Terms of Use and Privacy Policy');
      return;
    }

    // Check if user is logged in
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // For template 1 (free template), show copy to clipboard modal
    if (this.selectedTemplate === 1) {
      this.showCopyModal = true;
    } else {
      // For other templates, implement PRO logic
      console.log('PRO template functionality');
    }
  }

  copySignatureToClipboard() {
    const signatureElement = document.querySelector('.signature-preview .signature-wrapper');
    if (signatureElement) {
      const signatureHTML = signatureElement.outerHTML;
      
      // Create a temporary textarea to copy HTML
      const textarea = document.createElement('textarea');
      textarea.value = signatureHTML;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      
      // Show success toast
      this.showSuccessToast('Signature copied successfully!');
      this.showCopyModal = false;
    }
  }

  showSuccessToast(message: string) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
      </div>
    `;
    
    // Add toast styles
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 14px;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }

  closeCopyModal() {
    this.showCopyModal = false;
  }

  saveSignature() {
    console.log('Saving signature:', this.signatureData);
    // Implement save functionality
  }

  exportSignature() {
    console.log('Exporting signature');
    // Implement export functionality
  }

  goHome() {
    this.router.navigate(['/']);
  }
}