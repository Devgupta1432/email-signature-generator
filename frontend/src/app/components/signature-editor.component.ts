import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TemplateService } from '../services/template.service';
import { TemplateConfig, DynamicTemplateComponent } from './template-components/dynamic-template.component';
import { Temp2TemplateComponent } from './template-components/temp2-template.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SignatureData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mobile: string;
  company: string;
  designation: string;
  website: string;
  address: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  instagram: string;
  logo: string;
}

interface DesignOptions {
  template: string;
  fontFamily: string;
  fontSize: number;
  primaryColor: string;
  secondaryColor: string;
  layout: string;
  showSocialIcons: boolean;
  showCompanyLogo: boolean;
  dividerStyle: string;
}

@Component({
  selector: 'app-signature-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicTemplateComponent, Temp2TemplateComponent],
  template: `
    <div class="signature-editor">
      <!-- Header -->
      <div class="editor-header">
        <div class="container-fluid">
          <div class="row align-items-center">
            <div class="col-md-6">
              <button class="btn btn-outline-secondary me-3" (click)="goBack()">
                <i class="fas fa-arrow-left"></i> Back
              </button>
              <h4 class="d-inline mb-0">Signature Editor</h4>
            </div>
            <div class="col-md-6 text-end">
              <div class="auth-status me-3">
                <span class="status-dot" [class.online]="authService.isAuthenticated()" [class.offline]="!authService.isAuthenticated()"></span>
                <span class="status-text">{{ authService.isAuthenticated() ? 'Logged In' : 'Not Logged In' }}</span>
              </div>
              <button class="btn btn-outline-primary me-2" (click)="previewSignature()">
                <i class="fas fa-eye"></i> Preview
              </button>
              <button class="btn btn-primary" (click)="saveSignature()">
                <i class="fas fa-save"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="editor-content">
        <div class="container-fluid">
          <div class="row">
            <!-- Left Panel - Form -->
            <div class="col-lg-4 editor-panel">
              <div class="panel-content">
                
                <!-- Personal Information -->
                <div class="form-section">
                  <h5 class="section-title">
                    <i class="fas fa-user text-primary"></i>
                    Personal Information
                  </h5>
                  
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">First Name</label>
                      <input type="text" class="form-control" 
                             [(ngModel)]="signatureData.firstName" 
                             (input)="updatePreview()">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Last Name</label>
                      <input type="text" class="form-control" 
                             [(ngModel)]="signatureData.lastName" 
                             (input)="updatePreview()">
                    </div>
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-control" 
                           [(ngModel)]="signatureData.email" 
                           (input)="updatePreview()">
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Phone</label>
                      <input type="text" class="form-control" 
                             [(ngModel)]="signatureData.phone" 
                             (input)="updatePreview()">
                    </div>
                    <div class="col-md-6 mb-3">
                      <label class="form-label">Mobile</label>
                      <input type="text" class="form-control" 
                             [(ngModel)]="signatureData.mobile" 
                             (input)="updatePreview()">
                    </div>
                  </div>
                </div>

                <!-- Company Information -->
                <div class="form-section">
                  <h5 class="section-title">
                    <i class="fas fa-building text-primary"></i>
                    Company Information
                  </h5>
                  
                  <div class="mb-3">
                    <label class="form-label">Company Name</label>
                    <input type="text" class="form-control" 
                           [(ngModel)]="signatureData.company" 
                           (input)="updatePreview()">
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Job Title</label>
                    <input type="text" class="form-control" 
                           [(ngModel)]="signatureData.designation" 
                           (input)="updatePreview()">
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Website</label>
                    <input type="url" class="form-control" 
                           [(ngModel)]="signatureData.website" 
                           (input)="updatePreview()">
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Address</label>
                    <textarea class="form-control" rows="2" 
                              [(ngModel)]="signatureData.address" 
                              (input)="updatePreview()"></textarea>
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Company Tagline</label>
                    <input type="text" class="form-control" 
                           [(ngModel)]="tagline" 
                           (input)="updatePreview()" 
                           placeholder="Your company tagline">
                  </div>
                </div>

                <!-- Social Media -->
                <div class="form-section">
                  <h5 class="section-title">
                    <i class="fas fa-share-alt text-primary"></i>
                    Social Media
                  </h5>
                  
                  <div class="mb-3">
                    <label class="form-label">LinkedIn</label>
                    <input type="url" class="form-control" 
                           [(ngModel)]="signatureData.linkedin" 
                           (input)="updatePreview()">
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Twitter</label>
                    <input type="url" class="form-control" 
                           [(ngModel)]="signatureData.twitter" 
                           (input)="updatePreview()">
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Facebook</label>
                    <input type="url" class="form-control" 
                           [(ngModel)]="signatureData.facebook" 
                           (input)="updatePreview()">
                  </div>
                </div>

                <!-- Logo Upload -->
                <div class="form-section">
                  <h5 class="section-title">
                    <i class="fas fa-image text-primary"></i>
                    Logo & Image
                  </h5>
                  
                  <div class="upload-area" (click)="logoInput.click()" *ngIf="!signatureData.logo">
                    <input #logoInput type="file" accept="image/*" 
                           (change)="onLogoSelect($event)" style="display: none;">
                    <div class="upload-content">
                      <i class="fas fa-cloud-upload-alt"></i>
                      <p>Click to upload logo</p>
                      <small>PNG, JPG up to 2MB</small>
                    </div>
                  </div>
                  
                  <div class="uploaded-image" *ngIf="signatureData.logo">
                    <img [src]="signatureData.logo" alt="Logo" class="logo-preview">
                    <div class="image-actions">
                      <button class="btn btn-sm btn-outline-primary" (click)="logoInput.click()">
                        <i class="fas fa-edit"></i> Change
                      </button>
                      <button class="btn btn-sm btn-outline-danger" (click)="removeLogo()">
                        <i class="fas fa-trash"></i> Remove
                      </button>
                    </div>
                    <input #logoInput type="file" accept="image/*" 
                           (change)="onLogoSelect($event)" style="display: none;">
                  </div>
                </div>
              </div>
            </div>

            <!-- Center Panel - Design Options -->
            <div class="col-lg-3 design-panel">
              <div class="panel-content">
                
                <!-- Template Selection -->
                <div class="form-section">
                  <h5 class="section-title">
                    <i class="fas fa-palette text-primary"></i>
                    Design
                  </h5>
                  
                  <div class="mb-3">
                    <label class="form-label">Template</label>
                    <div class="template-grid">
                      <div class="template-option" 
                           *ngFor="let template of availableTemplates"
                           [class.active]="designOptions.template === template.id"
                           (click)="selectTemplate(template.id)">
                        <div class="template-preview" [ngClass]="template.id + '-preview'"></div>
                        <span>{{ template.name }}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Font Family</label>
                    <select class="form-select" [(ngModel)]="designOptions.fontFamily" 
                            (change)="updatePreview()">
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Verdana">Verdana</option>
                    </select>
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Font Size</label>
                    <select class="form-select" [(ngModel)]="designOptions.fontSize" 
                            (change)="updatePreview()">
                      <option [value]="12">12px</option>
                      <option [value]="14">14px</option>
                      <option [value]="16">16px</option>
                      <option [value]="18">18px</option>
                    </select>
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Primary Color</label>
                    <div class="color-picker">
                      <input type="color" class="form-control form-control-color" 
                             [(ngModel)]="designOptions.primaryColor" 
                             (change)="updatePreview()">
                    </div>
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label">Layout</label>
                    <div class="btn-group w-100" role="group">
                      <input type="radio" class="btn-check" id="vertical" 
                             value="vertical" [(ngModel)]="designOptions.layout" 
                             (change)="updatePreview()">
                      <label class="btn btn-outline-primary" for="vertical">Vertical</label>
                      
                      <input type="radio" class="btn-check" id="horizontal" 
                             value="horizontal" [(ngModel)]="designOptions.layout" 
                             (change)="updatePreview()">
                      <label class="btn btn-outline-primary" for="horizontal">Horizontal</label>
                    </div>
                  </div>
                  
                  <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" 
                           [(ngModel)]="designOptions.showSocialIcons" 
                           (change)="updatePreview()">
                    <label class="form-check-label">Show Social Icons</label>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Panel - Live Preview -->
            <div class="col-lg-5 preview-panel">
              <div class="panel-content">
                <div class="preview-header">
                  <h5 class="section-title">
                    <i class="fas fa-eye text-primary"></i>
                    Live Preview
                  </h5>
                  <div class="preview-actions">
                    <button class="btn btn-sm btn-modern" (click)="handleCopyClick()" [class.locked]="!authService.isAuthenticated()">
                      <i class="fas" [class.fa-copy]="authService.isAuthenticated()" [class.fa-lock]="!authService.isAuthenticated()"></i> 
                      {{ authService.isAuthenticated() ? 'Copy' : 'Login to Copy' }}
                    </button>
                    <button class="btn btn-sm btn-modern" (click)="handleDownloadClick()" [class.locked]="!authService.isAuthenticated()">
                      <i class="fas" [class.fa-download]="authService.isAuthenticated()" [class.fa-lock]="!authService.isAuthenticated()"></i> 
                      {{ authService.isAuthenticated() ? 'Download' : 'Login to Download' }}
                    </button>
                  </div>
                </div>
                
                <div class="signature-preview">
                  <!-- Template 2 Specific Component -->
                  <temp2-template *ngIf="designOptions.template === 'temp2'"
                                 [userData]="signatureData"
                                 [designOptions]="designOptions">
                  </temp2-template>
                  
                  <!-- Dynamic Template Preview -->
                  <dynamic-template *ngIf="currentTemplate && designOptions.template !== 'temp2'" 
                                   [templateConfig]="currentTemplate"
                                   [userData]="signatureData"
                                   [designOptions]="designOptions">
                  </dynamic-template>
                  
                  <!-- Fallback HTML Preview -->
                  <div *ngIf="!currentTemplate && designOptions.template !== 'temp2'" [innerHTML]="generatedSignature"></div>
                </div>
                
                <div class="export-options mt-4">
                  <h6>Export Options</h6>
                  <div class="btn-group w-100" role="group">
                    <button class="btn btn-outline-primary" (click)="handleHTMLExport()" [class.locked]="!authService.isAuthenticated()">
                      <i class="fas" [class.fa-code]="authService.isAuthenticated()" [class.fa-lock]="!authService.isAuthenticated()"></i> 
                      {{ authService.isAuthenticated() ? 'HTML' : 'Login' }}
                    </button>
                    <button class="btn btn-outline-primary" (click)="handleImageExport()" [class.locked]="!authService.isAuthenticated()">
                      <i class="fas" [class.fa-image]="authService.isAuthenticated()" [class.fa-lock]="!authService.isAuthenticated()"></i> 
                      {{ authService.isAuthenticated() ? 'Image' : 'Login' }}
                    </button>
                    <button class="btn btn-outline-primary" (click)="handleOutlookExport()" [class.locked]="!authService.isAuthenticated()">
                      <i class="fas" [class.fa-envelope]="authService.isAuthenticated()" [class.fa-lock]="!authService.isAuthenticated()"></i> 
                      {{ authService.isAuthenticated() ? 'Outlook' : 'Login' }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .signature-editor {
      min-height: 100vh;
      background: #f8f9fa;
    }

    .editor-header {
      background: white;
      border-bottom: 1px solid #dee2e6;
      padding: 1rem 0;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .editor-content {
      padding: 2rem 0;
    }

    .editor-panel, .design-panel, .preview-panel {
      padding: 0 1rem;
    }

    .panel-content {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      height: fit-content;
    }

    .form-section {
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #eee;
    }

    .form-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    .section-title {
      color: #2c3e50;
      font-weight: 600;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .form-label {
      font-weight: 500;
      color: #495057;
      margin-bottom: 0.5rem;
    }

    .form-control, .form-select {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 0.75rem;
      transition: all 0.3s ease;
    }

    .form-control:focus, .form-select:focus {
      border-color: #007bff;
      box-shadow: 0 0 0 0.2rem rgba(0,123,255,0.25);
    }

    .upload-area {
      border: 2px dashed #ddd;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .upload-area:hover {
      border-color: #007bff;
      background: #f8f9ff;
    }

    .upload-content i {
      font-size: 2rem;
      color: #6c757d;
      margin-bottom: 0.5rem;
    }

    .uploaded-image {
      text-align: center;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #f8f9fa;
    }

    .logo-preview {
      max-width: 100px;
      max-height: 60px;
      width: auto;
      height: auto;
      object-fit: contain;
      border-radius: 4px;
      margin-bottom: 1rem;
      display: block;
      margin-left: auto;
      margin-right: auto;
      border: 1px solid #eee;
    }

    .image-actions {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
    }

    .template-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .template-option {
      text-align: center;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .template-option:hover {
      background: #f8f9fa;
    }

    .template-option.active {
      background: #e3f2fd;
      border: 2px solid #007bff;
    }

    .template-preview {
      width: 100%;
      height: 40px;
      border-radius: 4px;
      margin-bottom: 0.25rem;
    }

    .modern-preview {
      background: linear-gradient(45deg, #007bff, #6610f2);
    }

    .classic-preview {
      background: linear-gradient(45deg, #28a745, #20c997);
    }

    .temp1-preview {
      background: linear-gradient(45deg, #667eea, #764ba2);
    }

    .temp2-preview {
      background: linear-gradient(45deg, #f59e0b, #d97706);
    }

    .minimal-preview {
      background: linear-gradient(45deg, #6c757d, #495057);
    }

    /* Template 1 Specific Styles */
    .temp1-signature-wrapper {
      width: 100%;
      max-width: 600px;
      font-family: Arial, sans-serif;
      display: flex;
      align-items: flex-start;
      background-color: white;

      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
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
      background: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .temp1-profile-img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
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
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .temp1-company-name {
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 4px;
      color: #000;
      margin-bottom: 8px;
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

    .temp1-social-icons .social-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      text-decoration: none;
      font-size: 18px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .temp1-social-icons .social-link:hover {
      transform: scale(1.1);
    }

    .temp1-social-icons .creative-linkedin { color: #0077b5; }
    .temp1-social-icons .creative-twitter { color: #1da1f2; }
    .temp1-social-icons .creative-facebook { color: #3b5998; }

    .color-picker input {
      width: 100%;
      height: 40px;
      border-radius: 8px;
    }

    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .preview-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-modern {
      background: linear-gradient(45deg, #667eea, #764ba2);
      border: none;
      color: white;
      border-radius: 20px;
      padding: 0.5rem 1rem;
      font-size: 0.85rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-modern:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      color: white;
    }

    .btn-modern.locked {
      background: linear-gradient(45deg, #9ca3af, #6b7280);
      cursor: not-allowed;
      opacity: 0.7;
    }

    .btn-modern.locked:hover {
      transform: none;
      box-shadow: none;
    }

    .btn-outline-primary.locked {
      border-color: #9ca3af;
      color: #6b7280;
      cursor: not-allowed;
      opacity: 0.7;
    }

    .btn-outline-primary.locked:hover {
      background: none;
      border-color: #9ca3af;
      color: #6b7280;
      transform: none;
    }

    .signature-preview {
      border: none;
      border-radius: 12px;
      padding: 2rem;
      background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
      min-height: 250px;
      font-family: Arial, sans-serif;
      overflow: hidden;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      position: relative;
    }

    .signature-preview::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(45deg, #667eea, #764ba2);
      border-radius: 12px 12px 0 0;
    }

    .signature-preview img, .signature-preview svg {
      vertical-align: middle;
      width: 140px;
      height: 140px;
      object-fit: cover !important;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      display: block !important;
    }

    .signature-preview table img {
      width: 120px;
      height: 120px;
      object-fit: cover !important;
      vertical-align: middle !important;
    }

    .export-options {
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .btn {
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #007bff;
      border-color: #007bff;
    }

    .btn-primary:hover {
      background: #0056b3;
      border-color: #0056b3;
    }

    .auth-status {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .status-dot.online {
      background: #10b981;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
    }

    .status-dot.offline {
      background: #ef4444;
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
    }

    .status-text {
      color: #64748b;
    }

    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    @media (max-width: 992px) {
      .editor-panel, .design-panel, .preview-panel {
        margin-bottom: 2rem;
      }
    }
  `]
})
export class SignatureEditorComponent implements OnInit {
  signatureData: SignatureData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    company: '',
    designation: '',
    website: '',
    address: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: '',
    logo: ''
  };

  designOptions: DesignOptions = {
    template: 'temp1',
    fontFamily: 'Arial',
    fontSize: 14,
    primaryColor: '#000000',
    secondaryColor: '#6c757d',
    layout: 'vertical',
    showSocialIcons: true,
    showCompanyLogo: true,
    dividerStyle: 'line'
  };

  currentTemplate: TemplateConfig | null = null;
  availableTemplates: TemplateConfig[] = [];

  tagline: string = '';

  generatedSignature: string = '';

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    public authService: AuthService,
    private templateService: TemplateService
  ) {}

  ngOnInit() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
    // Check for template query parameter
    this.route.queryParams.subscribe(params => {
      if (params['template']) {
        this.designOptions.template = params['template'];
      }
    });
    
    this.loadSavedState();
    this.loadTemplates();
    this.updatePreview();
  }

  loadTemplates() {
    this.availableTemplates = this.templateService.getAllTemplates();
    this.currentTemplate = this.templateService.getTemplateById(this.designOptions.template);
  }

  updatePreview() {
    this.generatedSignature = this.generateSignatureHTML();
  }

  generateSignatureHTML(): string {
    const { signatureData: data, designOptions: design } = this;
    
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const socialLinks = this.generateSocialLinks();
    
    // Build contact info only for fields that have values
    const contactItems = [];
    
    if (data.email) {
      contactItems.push(`<div style="margin-bottom: 2px;">
        <span style="color: ${design.primaryColor};">📧</span> 
        <a href="mailto:${data.email}" style="color: ${design.primaryColor}; text-decoration: none;">
          ${data.email}
        </a>
      </div>`);
    }
    
    if (data.phone) {
      contactItems.push(`<div style="margin-bottom: 2px;">
        <span style="color: ${design.primaryColor};">📞</span> 
        <a href="tel:${data.phone}" style="color: ${design.primaryColor}; text-decoration: none;">
          ${data.phone}
        </a>
      </div>`);
    }
    
    if (data.mobile) {
      contactItems.push(`<div style="margin-bottom: 2px;">
        <span style="color: ${design.primaryColor};">📱</span> 
        <a href="tel:${data.mobile}" style="color: ${design.primaryColor}; text-decoration: none;">
          ${data.mobile}
        </a>
      </div>`);
    }
    
    if (data.website) {
      contactItems.push(`<div style="margin-bottom: 2px;">
        <span style="color: ${design.primaryColor};">🌐</span> 
        <a href="${data.website}" style="color: ${design.primaryColor}; text-decoration: none;">
          ${data.website}
        </a>
      </div>`);
    }
    
    if (data.address) {
      contactItems.push(`<div style="margin-bottom: 2px;">
        <span style="color: ${design.primaryColor};">📍</span> 
        ${data.address}
      </div>`);
    }
    
    return `
      <div style="font-family: ${design.fontFamily}; font-size: ${design.fontSize}px; color: ${design.primaryColor}; line-height: 1.4; max-width: 500px;">
        <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 100%;">
          <tr>
            ${data.logo ? `<td style="padding-right: 20px; vertical-align: middle; width: 140px;">
              <img src="${data.logo}" alt="Logo" style="width: 120px !important; height: 120px !important; object-fit: cover !important; display: block !important; border-radius: 6px; vertical-align: middle;">
            </td>` : ''}
            <td style="vertical-align: middle; padding-left: 10px;">
              ${fullName ? `<div style="font-weight: bold; font-size: ${design.fontSize + 2}px; color: ${design.primaryColor}; margin-bottom: 5px;">
                ${fullName}
              </div>` : ''}
              
              ${data.designation ? `<div style="color: ${design.primaryColor}; margin-bottom: 3px;">
                ${data.designation}
              </div>` : ''}
              
              ${data.company ? `<div style="font-weight: 500; color: ${design.primaryColor}; margin-bottom: 8px;">
                ${data.company}
              </div>` : ''}
              
              ${contactItems.length > 0 ? `<div style="margin-bottom: 8px;">
                ${contactItems.join('')}
              </div>` : ''}
              
              ${socialLinks ? `<div style="margin-top: 10px;">
                ${socialLinks}
              </div>` : ''}
            </td>
          </tr>
        </table>
      </div>
    `;
  }

  generateSocialLinks(): string {
    if (!this.designOptions.showSocialIcons) return '';
    
    const links = [];
    const { signatureData: data } = this;
    
    if (data.linkedin && data.linkedin.trim()) {
      links.push(`<a href="${data.linkedin}" style="margin-right: 8px; text-decoration: none;">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzAwNzdiZiI+PHBhdGggZD0iTTIwLjQ0NyAyMC40NTJoLTMuNTU0di01LjU2OWMwLTEuMzI4LS4wMjctMy4wMzctMS44NTItMy4wMzctMS44NTMgMC0yLjEzNiAxLjQ0NS0yLjEzNiAyLjkzOXY1LjY2N0g5LjM1MVY5aDMuNDE0djEuNTYxaC4wNDZjLjQ3Ny0uOSAxLjYzNy0xLjg1IDMuMzctMS44NSAzLjYwMSAwIDQuMjY3IDIuMzcgNC4yNjcgNS40NTV2Ni4yODZ6TTUuMzM3IDcuNDMzYy0xLjE0NCAwLTIuMDYzLS45MjYtMi4wNjMtMi4wNjVzLjkyLTIuMDYzIDIuMDYzLTIuMDYzIDIuMDY1LjkyIDIuMDY1IDIuMDYzLS45MjEgMi4wNjUtMi4wNjUgMi4wNjV6bTEuNzgyIDEzLjAxOUgzLjU1NVY5aDMuNTY0djExLjQ1MnpNMjIuMjI1IDBIMS43NzFDLjc5MiAwIDAgLjc3NCAwIDEuNzI5djIwLjU0MkMwIDIzLjIyNy43OTIgMjQgMS43NzEgMjRoMjAuNDUxQzIzLjIgMjQgMjQgMjMuMjI3IDI0IDIyLjI3MVYxLjcyOUMyNCAuNzc0IDIzLjIgMCAyMi4yMjIgMGguMDAzeiIvPjwvc3ZnPg==" alt="LinkedIn" style="width: 20px; height: 20px;">
      </a>`);
    }
    
    if (data.twitter && data.twitter.trim()) {
      links.push(`<a href="${data.twitter}" style="margin-right: 8px; text-decoration: none;">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzFkYTFmMiI+PHBhdGggZD0iTTIzLjk1MyA0LjU3YTEwIDEwIDAgMDEtMi44MjUuNzc1IDQuOTU4IDQuOTU4IDAgMDAyLjE2My0yLjcyM2MtLjk1MS41NTUtMi4wMDUuOTU5LTMuMTI3IDEuMTg0YTQuOTIgNC45MiAwIDAwLTguMzg0IDQuNDgyQzcuNjkgOC4wOTUgNC4wNjcgNi4xMyAxLjY0IDMuMTYyYTQuODIyIDQuODIyIDAgMDAtLjY2NiAyLjQ3NWMwIDEuNzEuODcgMy4yMTMgMi4xODggNC4wOTZhNC45MDQgNC45MDQgMCAwMS0yLjIyOC0uNjE2di4wNmE0LjkyMyA0LjkyMyAwIDAwMy45NDYgNC44MjcgNC45OTYgNC45OTYgMCAwMS0yLjIxMi4wODUgNC45MzYgNC45MzYgMCAwMDQuNjA0IDMuNDE3IDkuODY3IDkuODY3IDAgMDEtNi4xMDIgMi4xMDVjLS4zOSAwLS43NzktLjAyMy0xLjE3LS4wNjdhMTMuOTk1IDEzLjk5NSAwIDAwNy41NTcgMi4yMDljOS4wNTMgMCAxNC4wMDItNy40OTYgMTQuMDAyLTEzLjk4NiAwLS4yMSAwLS40Mi0uMDE1LS42M0E5Ljk5MyA5Ljk5MyAwIDAwMjQgNC41OXoiLz48L3N2Zz4=" alt="Twitter" style="width: 20px; height: 20px;">
      </a>`);
    }
    
    if (data.facebook && data.facebook.trim()) {
      links.push(`<a href="${data.facebook}" style="margin-right: 8px; text-decoration: none;">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzE4NzdmMiI+PHBhdGggZD0iTTI0IDEyLjA3M2MwLTYuNjI3LTUuMzczLTEyLTEyLTEycy0xMiA1LjM3My0xMiAxMmMwIDUuOTkgNC4zODggMTAuOTU0IDEwLjEyNSAxMS45Mjd2LTguNDM3SDcuMDc4di0zLjQ5aDMuMDQ3VjkuNDNjMC0zLjAwNyAxLjc5Mi00LjY2OSA0LjUzMy00LjY2OSAxLjMxMiAwIDIuNjg2LjIzNCAyLjY4Ni4yMzR2Mi45NTNoLTEuNTEzYy0xLjQ5MSAwLTEuOTU1LjkyNS0xLjk1NSAxLjg3NHYyLjI1aDMuMzI4bC0uNTMyIDMuNDloLTIuNzk2djguNDM3QzE5LjYxMiAyMy4wMjcgMjQgMTguMDYyIDI0IDEyLjA3M3oiLz48L3N2Zz4=" alt="Facebook" style="width: 20px; height: 20px;">
      </a>`);
    }
    
    return links.length > 0 ? links.join('') : '';
  }

  selectTemplate(templateId: string) {
    this.designOptions.template = templateId;
    this.currentTemplate = this.templateService.getTemplateById(templateId);
    this.updatePreview();
  }

  onLogoSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.signatureData.logo = e.target.result;
        this.updatePreview();
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.resizeImage(e.target.result, 120, 120, (resizedImage) => {
          this.signatureData.logo = resizedImage;
          this.updatePreview();
        });
      };
      reader.readAsDataURL(file);
    }
    
    // Reset input value to allow same file selection
    event.target.value = '';
  }

  resizeImage(src: string, width: number, height: number, callback: (result: string) => void) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      callback(canvas.toDataURL('image/jpeg', 0.9));
    };
    
    img.src = src;
  }

  previewSignature() {
    // Open preview in new window
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      previewWindow.document.write(`
        <html>
          <head><title>Signature Preview</title></head>
          <body style="padding: 20px; font-family: Arial, sans-serif;">
            <h3>Email Signature Preview</h3>
            <div style="border: 1px solid #ddd; padding: 20px; background: white;">
              ${this.generatedSignature}
            </div>
          </body>
        </html>
      `);
    }
  }

  saveSignature() {
    // Implement save functionality
    console.log('Saving signature...', this.signatureData, this.designOptions);
  }

  copyToClipboard() {
    this.saveSignatureToStorage(); // Save signature when copying
    
    const element = document.querySelector('.signature-preview temp2-template') ||
                   document.querySelector('.signature-preview dynamic-template') || 
                   document.querySelector('.signature-preview > div');
    
    if (element) {
      import('html2canvas').then(html2canvas => {
        html2canvas.default(element as HTMLElement, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          width: 600,
          height: 250
        }).then(canvas => {
          canvas.toBlob((blob) => {
            if (blob) {
              navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
              ]).then(() => {
                this.showSuccessToast('Signature image copied to clipboard!');
              }).catch(() => {
                this.showSuccessToast('Please use download instead - clipboard not supported');
              });
            }
          });
        });
      }).catch(() => {
        this.showSuccessToast('Please use download instead');
      });
    }
  }

  downloadImage() {
    this.saveSignatureToStorage(); // Save signature when downloading
    
    const element = document.querySelector('.signature-preview .template-container') ||
                   document.querySelector('.signature-preview temp2-template .signature-wrapper') || 
                   document.querySelector('.signature-preview > div');
    
    if (element) {
      import('html2canvas').then(html2canvas => {
        const rect = element.getBoundingClientRect();
        html2canvas.default(element as HTMLElement, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          width: rect.width,
          height: rect.height,
          scrollX: 0,
          scrollY: 0
        }).then(canvas => {
          const link = document.createElement('a');
          link.download = 'signature.png';
          link.href = canvas.toDataURL('image/png', 1.0);
          link.click();
          this.showSuccessToast('Signature downloaded successfully!');
        });
      }).catch(() => {
        // Fallback: create a simple download
        const blob = new Blob([this.generatedSignature], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'signature.html';
        a.click();
        this.showSuccessToast('Signature downloaded successfully!');
      });
    }
  }

  exportAsHTML() {
    const element = document.querySelector('.signature-preview temp2-template') ||
                   document.querySelector('.signature-preview dynamic-template') || 
                   document.querySelector('.signature-preview > div');
    const content = element ? element.outerHTML : this.generatedSignature;
    
    const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Signature</title>
</head>
<body>
${content}
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-signature.html';
    a.click();
    URL.revokeObjectURL(url);
    this.showSuccessToast('HTML signature exported successfully!');
  }

  exportAsImage() {
    const element = document.querySelector('.signature-preview .template-container') ||
                   document.querySelector('.signature-preview temp2-template .signature-wrapper') || 
                   document.querySelector('.signature-preview > div');
    
    if (element) {
      import('html2canvas').then(html2canvas => {
        const rect = element.getBoundingClientRect();
        html2canvas.default(element as HTMLElement, {
          backgroundColor: '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: true,
          width: rect.width,
          height: rect.height,
          scrollX: 0,
          scrollY: 0
        }).then(canvas => {
          const link = document.createElement('a');
          link.download = 'email-signature.png';
          link.href = canvas.toDataURL('image/png', 1.0);
          link.click();
          this.showSuccessToast('Image signature exported successfully!');
        }).catch(error => {
          console.error('Export failed:', error);
          this.showSuccessToast('Export failed. Please try again.');
        });
      });
    }
  }

  exportForOutlook() {
    const element = document.querySelector('.signature-preview temp2-template') ||
                   document.querySelector('.signature-preview dynamic-template') || 
                   document.querySelector('.signature-preview > div');
    const content = element ? element.outerHTML : this.generatedSignature;
    
    // Create Outlook-compatible HTML with inline styles
    const outlookHTML = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="ProgId" content="Word.Document">
  <meta name="Generator" content="Microsoft Word 15">
  <meta name="Originator" content="Microsoft Word 15">
  <!--[if !mso]>
  <style>
    v\\:* {behavior:url(#default#VML);}
    o\\:* {behavior:url(#default#VML);}
    w\\:* {behavior:url(#default#VML);}
    .shape {behavior:url(#default#VML);}
  </style>
  <![endif]-->
</head>
<body>
  <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.4;">
    ${content}
  </div>
</body>
</html>`;
    
    const blob = new Blob([outlookHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'outlook-signature.htm';
    a.click();
    URL.revokeObjectURL(url);
    this.showSuccessToast('Outlook signature exported successfully!');
  }

  goBack() {
    this.router.navigate(['/']);
  }

  removeLogo() {
    this.signatureData.logo = '';
    this.updatePreview();
  }

  getFullName(): string {
    return `${this.signatureData.firstName} ${this.signatureData.lastName}`.trim();
  }

  handleCopyClick() {
    if (!this.authService.isAuthenticated()) {
      this.saveCurrentState();
      this.router.navigate(['/register'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    this.copyToClipboard();
  }

  handleDownloadClick() {
    if (!this.authService.isAuthenticated()) {
      this.saveCurrentState();
      this.router.navigate(['/register'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    this.downloadImage();
  }

  handleHTMLExport() {
    if (!this.authService.isAuthenticated()) {
      this.saveCurrentState();
      this.router.navigate(['/register'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    this.exportAsHTML();
  }

  handleImageExport() {
    if (!this.authService.isAuthenticated()) {
      this.saveCurrentState();
      this.router.navigate(['/register'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    this.exportAsImage();
  }

  handleOutlookExport() {
    if (!this.authService.isAuthenticated()) {
      this.saveCurrentState();
      this.router.navigate(['/register'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    this.exportForOutlook();
  }

  saveCurrentState() {
    const state = {
      signatureData: this.signatureData,
      designOptions: this.designOptions,
      tagline: this.tagline,
      returnUrl: this.router.url
    };
    localStorage.setItem('editorState', JSON.stringify(state));
    localStorage.setItem('redirectAfterLogin', this.router.url);
  }

  loadSavedState() {
    const savedState = localStorage.getItem('editorState');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.signatureData = state.signatureData || this.signatureData;
      this.designOptions = state.designOptions || this.designOptions;
      this.tagline = state.tagline || this.tagline;
      localStorage.removeItem('editorState');
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  saveSignatureToStorage() {
    const signatureName = `${this.designOptions.template} Signature - ${new Date().toLocaleDateString()}`;
    const previewHtml = this.generatePreviewHtml();
    
    const signature = {
      id: Date.now(),
      name: signatureName,
      template: this.designOptions.template,
      createdAt: new Date(),
      lastModified: new Date(),
      previewHtml: previewHtml,
      userData: { ...this.signatureData }
    };
    
    const existingSignatures = JSON.parse(localStorage.getItem('userSignatures') || '[]');
    existingSignatures.push(signature);
    localStorage.setItem('userSignatures', JSON.stringify(existingSignatures));
  }

  generatePreviewHtml(): string {
    if (this.designOptions.template === 'temp1') {
      return this.generateTemp1Html();
    } else if (this.designOptions.template === 'temp2') {
      return this.generateTemp2Html();
    }
    return this.generatedSignature;
  }

  generateTemp1Html(): string {
    const fullName = `${this.signatureData.firstName} ${this.signatureData.lastName}`.trim();
    const logoSrc = this.signatureData.logo || 'https://via.placeholder.com/120';
    return `
      <div style="display: flex; align-items: flex-start; background-color: white; padding: 1rem; border: 1px solid rgb(226, 232, 240); border-radius: 8px; max-width: 600px; font-family: Arial; font-size: 14px; color: rgb(0, 0, 0); overflow: hidden; overflow-wrap: break-word;">
        <div style="flex: 0 0 200px; text-align: center; padding-right: 20px; border-right: 1px solid rgb(0, 0, 0);">
          <div style="width: 140px; height: 140px; margin: 0 auto;">
            <img src="${logoSrc}" alt="Profile Image" style="width: 100%; height: 100%; border: 2px solid black; border-radius: 50%;">
          </div>
          <div style="text-align: center; width: 100%; margin-top: 10px;">
            <div style="text-align: center; font-size: 18px; font-weight: normal; color: rgb(0, 0, 0); margin-bottom: 5px;">${fullName || 'Your Name'}</div>
            <div style="text-align: center; font-size: 12px; letter-spacing: 2px; color: rgb(0, 0, 0);">${this.signatureData.designation || 'Your Title'}</div>
          </div>
        </div>
        <div style="flex: 1 1 0%; padding-left: 30px; display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start;">
          <div style="color: rgb(0, 0, 0);">
            <div style="font-size: 18px; font-weight: bold; letter-spacing: 2px; color: #000; margin-bottom: 15px;">${this.signatureData.company || 'Your Company'}</div>
            ${this.signatureData.phone ? `<div style="display: flex; align-items: center; margin-bottom: 8px; color: #000; font-size: 12px;"><span style="margin-right: 10px;">📞</span> ${this.signatureData.phone}</div>` : ''}
            ${this.signatureData.website ? `<div style="display: flex; align-items: center; margin-bottom: 8px; color: #000; font-size: 12px;"><span style="margin-right: 10px;">🌐</span> ${this.signatureData.website}</div>` : ''}
            ${this.signatureData.email ? `<div style="display: flex; align-items: center; margin-bottom: 8px; color: #000; font-size: 12px;"><span style="margin-right: 10px;">📧</span> ${this.signatureData.email}</div>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  generateTemp2Html(): string {
    const fullName = `${this.signatureData.firstName} ${this.signatureData.lastName}`.trim();
    return `
      <div style="font-family: Arial, sans-serif; display: flex; gap: 2rem; align-items: flex-start; padding: 1.5rem; border-radius: 8px; max-width: 600px; background-color: #f9f6f4;">
        <div style="flex: 0 0 150px;">
          ${this.signatureData.logo ? `<img src="${this.signatureData.logo}" style="width: 150px; height: 210px; border-radius: 8px; object-fit: cover; border: 2px solid #000;">` : '<div style="width: 150px; height: 210px; border-radius: 8px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: 2px solid #000;"></div>'}
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-start; min-height: 210px;">
          <div style="font-family: 'Brush Script MT', cursive; font-size: 24px; font-weight: normal; color: #000;">${fullName}</div>
          <div style="font-weight: bold; letter-spacing: 1px; font-size: 12px; color: #000;">${this.signatureData.designation}</div>
          <hr style="border: none; border-top: 2px solid #000; margin: 10px 0; margin-left: -32px; opacity: 1;">
          <div style="display: flex; flex-direction: column; gap: 4px;">
            ${this.signatureData.phone ? `<div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #000;"><i style="width: 14px; text-align: center;">📞</i> ${this.signatureData.phone}</div>` : ''}
            ${this.signatureData.email ? `<div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #000;"><i style="width: 14px; text-align: center;">📧</i> ${this.signatureData.email}</div>` : ''}
            ${this.signatureData.website ? `<div style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #000;"><i style="width: 14px; text-align: center;">🌐</i> ${this.signatureData.website}</div>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  showSuccessToast(message: string) {
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
      </div>
    `;
    
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
      animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }
}