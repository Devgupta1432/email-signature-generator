import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-enhanced-homepage',
  template: `
    <div class="homepage-enhanced">
      <!-- Navigation -->
      <nav class="navbar-enhanced" [class.scrolled]="isScrolled">
        <div class="container">
          <div class="nav-content">
            <div class="brand" (click)="scrollToSection('hero')">
              <div class="logo-icon">
                <div class="logo-shine"></div>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              </div>
              <span class="brand-text">SignatureCraft</span>
            </div>
            
            <div class="nav-links">
              <a (click)="scrollToSection('features')" class="nav-link">
                <span>Features</span>
                <div class="nav-link-bg"></div>
              </a>
              <a (click)="scrollToSection('templates')" class="nav-link">
                <span>Templates</span>
                <div class="nav-link-bg"></div>
              </a>
              <a (click)="scrollToSection('pricing')" class="nav-link">
                <span>Pricing</span>
                <div class="nav-link-bg"></div>
              </a>
              <button class="btn-nav-login" (click)="goToLogin()" *ngIf="!authService.isAuthenticated()">
                <span>Sign In</span>
                <div class="btn-ripple"></div>
              </button>
              <button class="btn-nav-signup" (click)="goToRegister()" *ngIf="!authService.isAuthenticated()">
                <span>Get Started</span>
                <div class="btn-glow"></div>
              </button>
              
              <!-- My Account Dropdown -->
              <div class="account-dropdown" *ngIf="authService.isAuthenticated()">
                <div class="account-trigger" (click)="toggleAccountDropdown()">
                  <span class="account-text">My Account</span>
                  <i class="fas fa-chevron-down" [class.rotated]="accountDropdownOpen"></i>
                </div>
                
                <div class="dropdown-menu" [class.open]="accountDropdownOpen" (click)="$event.stopPropagation()">
                  <div class="dropdown-status">
                    <div class="status-item">
                      <div class="status-dot online"></div>
                      <span>Online</span>
                    </div>
                    <div class="status-item">
                      <div class="status-dot" [class.pro]="authService.isPro()" [class.free]="!authService.isPro()"></div>
                      <span>{{ authService.isPro() ? 'PRO Member' : 'FREE Member' }}</span>
                    </div>
                  </div>
                  <div class="dropdown-divider"></div>
                  <div class="dropdown-item" (click)="goToMySignatures(); $event.stopPropagation()">
                    <i class="fas fa-signature"></i>
                    <span>My Signatures</span>
                  </div>
                  <div class="dropdown-item" (click)="goToProfile(); $event.stopPropagation()">
                    <i class="fas fa-user-edit"></i>
                    <span>Edit Profile</span>
                  </div>

                  <div class="dropdown-item upgrade-item" *ngIf="!authService.isPro()" (click)="goToPricing(); $event.stopPropagation()">
                    <i class="fas fa-crown"></i>
                    <span>Upgrade to PRO</span>
                  </div>
                  <div class="dropdown-divider"></div>
                  <div class="dropdown-item" (click)="logout(); $event.stopPropagation()">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button class="mobile-menu-toggle" (click)="toggleMobileMenu()">
              <div class="hamburger" [class.active]="mobileMenuOpen">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
          
          <div class="mobile-menu" [class.active]="mobileMenuOpen">
            <div class="mobile-nav-links">
              <a (click)="scrollToSection('features')" class="mobile-nav-link">
                <span>Features</span>
                <i class="fas fa-chevron-right"></i>
              </a>
              <a (click)="scrollToSection('templates')" class="mobile-nav-link">
                <span>Templates</span>
                <i class="fas fa-chevron-right"></i>
              </a>
              <a (click)="scrollToSection('pricing')" class="mobile-nav-link">
                <span>Pricing</span>
                <i class="fas fa-chevron-right"></i>
              </a>
            </div>
            <div class="mobile-nav-buttons">
              <button class="btn-nav-login mobile" (click)="goToLogin()" *ngIf="!authService.isAuthenticated()">
                <span>Sign In</span>
              </button>
              <button class="btn-nav-signup mobile" (click)="goToRegister()" *ngIf="!authService.isAuthenticated()">
                <span>Get Started</span>
              </button>
              <div class="mobile-account-section" *ngIf="authService.isAuthenticated()">
                <div class="mobile-account-info">
                  <span>My Account</span>
                  <div class="mobile-status">
                    <span class="status-text">{{ authService.isPro() ? 'PRO' : 'FREE' }}</span>
                  </div>
                </div>
                <button class="btn-nav-login mobile" (click)="goToMySignatures()">
                  <span>My Signatures</span>
                </button>
                <button class="btn-nav-login mobile" (click)="logout()">
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section id="hero" class="hero-enhanced">
        <div class="hero-bg">
          <div class="hero-gradient"></div>
          <div class="hero-pattern"></div>
        </div>
        
        <div class="container">
          <div class="hero-layout">
            <div class="hero-content">

              <h1 class="hero-title">
                <span class="static-text">Create Professional Email Signatures in Seconds</span>
              </h1>
              
              <p class="hero-subtitle">
                Design stunning, responsive email signatures with our intuitive editor. 
                Choose from 100+ templates, customize with your brand, and deploy instantly.
              </p>
              
              <div class="hero-actions">
                <button class="btn-primary-large interactive-btn" (click)="getStarted(); createRipple($event)">
                  <span>Start Creating Free</span>
                  <svg class="btn-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                  </svg>
                  <div class="btn-particles"></div>
                </button>
                
                <button class="btn-secondary-large interactive-btn" (click)="createRipple($event)">
                  <div class="play-button-inner">
                    <svg class="play-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                    </svg>
                  </div>
                  <span>Watch Demo</span>
                </button>
              </div>
              
              <div class="hero-stats">
                <div class="stat">
                  <div class="stat-number">50K+</div>
                  <div class="stat-label">Active Users</div>
                </div>
                <div class="stat">
                  <div class="stat-number">100+</div>
                  <div class="stat-label">Templates</div>
                </div>
                <div class="stat">
                  <div class="stat-number">99.9%</div>
                  <div class="stat-label">Uptime</div>
                </div>
              </div>
            </div>
            
            <div class="hero-visual">
            <div class="floating-bg-elements">
              <div class="floating-element bg-element-1 parallax-element"></div>
              <div class="floating-element bg-element-2 parallax-element"></div>
              <div class="floating-element bg-element-3 parallax-element"></div>
            </div>
            
            <div class="hero-showcase">
              <div class="editor-preview">
                <div class="editor-header">
                  <div class="editor-tabs">
                    <span class="tab active">Design</span>
                    <span class="tab">Preview</span>
                    <span class="tab">Export</span>
                  </div>
                  <div class="editor-actions">
                    <span class="action-dot save"></span>
                    <span class="action-dot minimize"></span>
                    <span class="action-dot close"></span>
                  </div>
                </div>
                
                <div class="editor-content">
                  <div class="signature-canvas">
                    <div class="signature-card" [class.active]="currentSignatureIndex === 0">
                      <div class="signature-preview">
                        <div class="signature-content">
                          <div class="avatar pulse-animation"></div>
                          <div class="info">
                            <div class="name">Sarah Johnson</div>
                            <div class="title">Senior Designer</div>
                            <div class="company">TechCorp Inc.</div>
                            <div class="social-icons">
                              <span class="social-dot linkedin"></span>
                              <span class="social-dot twitter"></span>
                              <span class="social-dot instagram"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="signature-card" [class.active]="currentSignatureIndex === 1">
                      <div class="signature-preview">
                        <div class="signature-content minimal">
                          <div class="name">Alex Chen</div>
                          <div class="title">Product Manager</div>
                          <div class="company">InnovateCorp</div>
                          <div class="contact-line">
                            <span class="email-icon">✉</span> alex@innovate.com
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="signature-card" [class.active]="currentSignatureIndex === 2">
                      <div class="signature-preview">
                        <div class="signature-content corporate">
                          <div class="logo-placeholder gradient-logo"></div>
                          <div class="info">
                            <div class="name">Michael Brown</div>
                            <div class="title">CEO & Founder</div>
                            <div class="company">StartupHub</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="editor-sidebar">
                    <div class="tool-section">
                      <div class="tool-title">Colors</div>
                      <div class="color-palette">
                        <span class="color-dot" style="background: #667eea"></span>
                        <span class="color-dot" style="background: #764ba2"></span>
                        <span class="color-dot" style="background: #f093fb"></span>
                        <span class="color-dot" style="background: #f5576c"></span>
                      </div>
                    </div>
                    
                    <div class="tool-section">
                      <div class="tool-title">Fonts</div>
                      <div class="font-options">
                        <div class="font-option active">Inter</div>
                        <div class="font-option">Roboto</div>
                        <div class="font-option">Arial</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="signature-indicators">
                <span class="indicator" [class.active]="currentSignatureIndex === 0"></span>
                <span class="indicator" [class.active]="currentSignatureIndex === 1"></span>
                <span class="indicator" [class.active]="currentSignatureIndex === 2"></span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="features-enhanced">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">Features</div>
            <h2>Everything you need to create perfect signatures</h2>
            <p>Powerful tools and beautiful templates to make your email signature stand out</p>
          </div>
          
          <div class="features-grid">
            <div class="feature-card animate-on-scroll" (mouseenter)="onFeatureHover($event)" (mouseleave)="onFeatureLeave($event)">
              <div class="feature-icon gradient-blue">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"/>
                </svg>
              </div>
              <h3>Drag & Drop Editor</h3>
              <p>Intuitive visual editor with real-time preview. No coding required.</p>
              <div class="feature-hover-effect"></div>
            </div>
            
            <div class="feature-card animate-on-scroll" (mouseenter)="onFeatureHover($event)" (mouseleave)="onFeatureLeave($event)">
              <div class="feature-icon gradient-purple">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z"/>
                </svg>
              </div>
              <h3>100+ Templates</h3>
              <p>Professional templates for every industry and style preference.</p>
              <div class="feature-hover-effect"></div>
            </div>
            
            <div class="feature-card animate-on-scroll" (mouseenter)="onFeatureHover($event)" (mouseleave)="onFeatureLeave($event)">
              <div class="feature-icon gradient-green">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21C5,22.1 5.89,23 7,23H17C18.1,23 19,22.1 19,21V3C19,1.89 18.1,1 17,1Z"/>
                </svg>
              </div>
              <h3>Mobile Responsive</h3>
              <p>Signatures that look perfect on all devices and email clients.</p>
              <div class="feature-hover-effect"></div>
            </div>
            
            <div class="feature-card animate-on-scroll" (mouseenter)="onFeatureHover($event)" (mouseleave)="onFeatureLeave($event)">
              <div class="feature-icon gradient-orange">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2Z"/>
                </svg>
              </div>
              <h3>Brand Integration</h3>
              <p>Add your logo, colors, and social media links seamlessly.</p>
              <div class="feature-hover-effect"></div>
            </div>
                        <div class="feature-card animate-on-scroll" (mouseenter)="onFeatureHover($event)" (mouseleave)="onFeatureLeave($event)">
              <div class="feature-icon gradient-purple">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z"/>
                </svg>
              </div>
              <h3>100+ Templates</h3>
              <p>Professional templates for every industry and style preference.</p>
              <div class="feature-hover-effect"></div>
            </div>
            
            <div class="feature-card animate-on-scroll" (mouseenter)="onFeatureHover($event)" (mouseleave)="onFeatureLeave($event)">
              <div class="feature-icon gradient-pink">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16,6L18.29,8.29L13.41,13.17L9.41,9.17L2,16.59L3.41,18L9.41,12L13.41,16L19.71,9.71L22,12V6H16Z"/>
                </svg>
              </div>
              <h3>Analytics Tracking</h3>
              <p>Track clicks, opens, and engagement with built-in analytics.</p>
              <div class="feature-hover-effect"></div>
            </div>
                        <div class="feature-card animate-on-scroll" (mouseenter)="onFeatureHover($event)" (mouseleave)="onFeatureLeave($event)">
              <div class="feature-icon gradient-blue">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z"/>
                </svg>
              </div>
              <h3>Drag & Drop Editor</h3>
              <p>Intuitive visual editor with real-time preview. No coding required.</p>
              <div class="feature-hover-effect"></div>
            </div>
            <div class="feature-card animate-on-scroll" (mouseenter)="onFeatureHover($event)" (mouseleave)="onFeatureLeave($event)">
              <div class="feature-icon gradient-teal">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16,4C16.88,4 17.67,4.5 18,5.26L19,7H20A2,2 0 0,1 22,9V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V9A2,2 0 0,1 4,7H5L6,5.26C6.33,4.5 7.12,4 8,4H16M8.5,7A0.5,0.5 0 0,0 8,7.5A0.5,0.5 0 0,0 8.5,8A0.5,0.5 0 0,0 9,7.5A0.5,0.5 0 0,0 8.5,7M12,9A4,4 0 0,0 8,13A4,4 0 0,0 12,17A4,4 0 0,0 16,13A4,4 0 0,0 12,9Z"/>
                </svg>
              </div>
              <h3>Team Management</h3>
              <p>Manage signatures for your entire team from one dashboard.</p>
              <div class="feature-hover-effect"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Templates Section -->
      <section id="templates" class="templates-section">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">Templates</div>
            <h2>Choose from 100+ Professional Templates</h2>
            <p>Beautifully designed templates for every industry and style</p>
          </div>
          
          <div class="template-categories">
            <button class="category-btn active" (click)="setActiveCategory('all')" [class.active]="activeCategory === 'all'">
              All Templates
            </button>
            <button class="category-btn" (click)="setActiveCategory('modern')" [class.active]="activeCategory === 'modern'">
              Modern
            </button>
            <button class="category-btn" (click)="setActiveCategory('corporate')" [class.active]="activeCategory === 'corporate'">
              Corporate
            </button>
            <button class="category-btn" (click)="setActiveCategory('creative')" [class.active]="activeCategory === 'creative'">
              Creative
            </button>
            <button class="category-btn" (click)="setActiveCategory('minimal')" [class.active]="activeCategory === 'minimal'">
              Minimal
            </button>
          </div>
          
          <div class="templates-grid">
            <div class="template-card animate-on-scroll" *ngFor="let template of filteredTemplates; let i = index" 
                 [style.animation-delay.s]="i * 0.1" (click)="previewTemplate(template)">
              <div class="template-preview">
                <div class="template-image" [style.background]="template.gradient">
                  <img *ngIf="template.imageUrl" [src]="template.imageUrl" class="template-image-display" alt="{{ template.name }}">
                  <div class="template-content" *ngIf="!template.imageUrl">
                    <div class="template-avatar" [class]="template.avatarClass"></div>
                    <div class="template-info">
                      <div class="template-name">{{ template.sampleName }}</div>
                      <div class="template-title">{{ template.sampleTitle }}</div>
                      <div class="template-company">{{ template.sampleCompany }}</div>
                      <div class="template-social" *ngIf="template.showSocial">
                        <span class="social-icon">in</span>
                        <span class="social-icon">tw</span>
                        <span class="social-icon">ig</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="template-overlay">
                  <button class="preview-btn">
                    <i class="fas fa-eye"></i>
                    Preview
                  </button>
                  <button class="use-btn" (click)="useTemplate(template.id); $event.stopPropagation()">
                    <i class="fas fa-plus"></i>
                    Use Template
                  </button>
                </div>
                <div class="pro-badge" *ngIf="template.isPro">
                  <i class="fas fa-crown"></i>
                  PRO
                </div>
              </div>
              <div class="template-details">
                <h3>{{ template.name }}</h3>
                <p>{{ template.description }}</p>
                <div class="template-tags">
                  <span class="tag" *ngFor="let tag of template.tags">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="templates-cta">
            <button class="btn-view-all" (click)="viewAllTemplates()">
              <span>View All Templates</span>
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section id="pricing" class="pricing-section">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">Pricing</div>
<h2>Simple, Transparent Pricing</h2>
            <p>Choose the plan that works best for you</p>
          </div>
          
          <div class="pricing-toggle">
            <span [class.active]="!isAnnual">Monthly</span>
            <div class="toggle-switch" (click)="togglePricing()">
              <div class="toggle-slider" [class.annual]="isAnnual"></div>
            </div>
            <span [class.active]="isAnnual">Annual</span>
            <div class="save-badge" *ngIf="isAnnual">Save 20%</div>
          </div>
          
          <div class="pricing-cards">
            <div class="pricing-card free animate-on-scroll">
              <div class="card-header">
                <h3>Free</h3>
                <div class="price">
                  <span class="currency">$</span>
                  <span class="amount">0</span>
                  <span class="period">/forever</span>
                </div>
                <p>Perfect for getting started</p>
              </div>
              <div class="card-features">
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>5 Basic Templates</span>
                </div>
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>Basic Editor</span>
                </div>
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>HTML Export</span>
                </div>
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>Email Support</span>
                </div>
                <div class="feature disabled">
                  <i class="fas fa-times"></i>
                  <span>Premium Templates</span>
                </div>
                <div class="feature disabled">
                  <i class="fas fa-times"></i>
                  <span>Analytics</span>
                </div>
              </div>
              <button class="plan-btn free-btn" (click)="selectPlan('free')">
                Get Started Free
              </button>
            </div>
            
            <div class="pricing-card pro animate-on-scroll popular">
              <div class="popular-badge">
                <i class="fas fa-star"></i>
                Most Popular
              </div>
              <div class="card-header">
                <h3>PRO</h3>
                <div class="price">
                  <span class="currency">$</span>
                  <span class="amount">{{ isAnnual ? '8' : '9.99' }}</span>
                  <span class="period">{{ isAnnual ? '/month' : '/month' }}</span>
                </div>
                <p *ngIf="isAnnual" class="billing-note">Billed annually ($96/year)</p>
                <p *ngIf="!isAnnual" class="billing-note">Billed monthly</p>
                <p>Everything you need to create professional signatures</p>
              </div>
              <div class="card-features">
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>100+ Premium Templates</span>
                </div>
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>Advanced Editor</span>
                </div>
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>All Export Formats</span>
                </div>
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>Analytics & Tracking</span>
                </div>
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>Team Management</span>
                </div>
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>Priority Support</span>
                </div>
              </div>
              <button class="plan-btn pro-btn" (click)="selectPlan('pro')">
                <span>Start PRO Trial</span>
                <i class="fas fa-crown"></i>
              </button>
            </div>
            
            <div class="pricing-card lifetime animate-on-scroll">
              <div class="card-header">
                <h3>Lifetime</h3>
                <div class="price">
                  <span class="currency">$</span>
                  <span class="amount">29.99</span>
                  <span class="period">/one-time</span>
                </div>
                <p>Pay once, use forever</p>
              </div>
              <div class="card-features">
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>Everything in PRO</span>
                </div>
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>Lifetime Updates</span>
                </div>
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>No Monthly Fees</span>
                </div>
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>Future Features</span>
                </div>
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>Commercial License</span>
                </div>
                <div class="feature">
                  <i class="fas fa-check"></i>
                  <span>White-label Option</span>
                </div>
              </div>
              <button class="plan-btn lifetime-btn" (click)="selectPlan('lifetime')">
                Get Lifetime Access
              </button>
            </div>
          </div>
          
          <div class="pricing-faq">
            <h3>Frequently Asked Questions</h3>
            <div class="faq-grid">
              <div class="faq-item" *ngFor="let faq of pricingFaqs" (click)="toggleFaq(faq)">
                <div class="faq-question">
                  <span>{{ faq.question }}</span>
                  <i class="fas fa-chevron-down" [class.rotated]="faq.open"></i>
                </div>
                <div class="faq-answer" [class.open]="faq.open">
                  <p>{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- AI Chatbot -->
      <div class="ai-chatbot" [class.open]="chatbotOpen">
        <div class="chatbot-toggle" (click)="toggleChatbot()">
          <i class="fas fa-robot" *ngIf="!chatbotOpen"></i>
          <i class="fas fa-times" *ngIf="chatbotOpen"></i>
        </div>
        
        <div class="chatbot-window" *ngIf="chatbotOpen">
          <div class="chatbot-header">
            <div class="bot-avatar">
              <i class="fas fa-robot"></i>
            </div>
            <div class="bot-info">
              <div class="bot-name">SignatureBot</div>
              <div class="bot-status">Online</div>
            </div>
          </div>
          
          <div class="chatbot-messages">
            <div class="message bot-message" *ngFor="let message of chatMessages">
              <div class="message-avatar" *ngIf="message.type === 'bot'">
                <i class="fas fa-robot"></i>
              </div>
              <div class="message-content" [class.user]="message.type === 'user'">
                {{ message.content }}
              </div>
            </div>
            
            <div class="quick-replies" *ngIf="showQuickReplies">
              <div class="quick-reply-title">Quick questions:</div>
              <div class="quick-reply-buttons">
                <button class="quick-reply-btn" *ngFor="let reply of quickReplies" 
                        (click)="selectQuickReply(reply)">
                  <i [class]="reply.icon"></i>
                  {{ reply.text }}
                </button>
              </div>
            </div>
            
            <div class="typing-indicator" *ngIf="chatbotTyping">
              <div class="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
          
          <div class="chatbot-input">
            <input type="text" 
                   [(ngModel)]="userMessage" 
                   (keyup.enter)="sendMessage()"
                   placeholder="Ask about pricing, features..."
                   class="chat-input">
            <button (click)="sendMessage()" class="send-btn">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .homepage-enhanced {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow-x: hidden;
    }

    /* Navigation */
    .navbar-enhanced {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      padding: 1rem 0;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
    }

    .navbar-enhanced.scrolled {
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(30px);
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
      padding: 0.8rem 0;
      border-bottom: 1px solid rgba(102, 126, 234, 0.1);
    }

    .navbar-enhanced.scrolled .logo-icon {
      transform: scale(0.9);
    }

    .navbar-enhanced.scrolled .brand-text {
      font-size: 1.4rem;
    }

    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .brand:hover {
      transform: translateY(-1px);
    }

    .logo-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.35);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .logo-shine {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%);
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
      transition: transform 0.6s ease;
    }

    .brand:hover .logo-shine {
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }

    .brand:hover .logo-icon {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
    }

    .logo-icon svg {
      width: 20px;
      height: 20px;
      z-index: 1;
    }

    .brand-text {
      font-size: 1.6rem;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.5px;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 2.5rem;
    }

    .nav-link {
      color: #64748b;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.95rem;
      position: relative;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      overflow: hidden;
    }

    .nav-link span {
      position: relative;
      z-index: 2;
      transition: color 0.3s ease;
    }

    .nav-link-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 12px;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 50%;
      width: 0;
      height: 2px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateX(-50%);
      border-radius: 1px;
    }

    .nav-link:hover {
      color: #667eea;
      transform: translateY(-1px);
    }

    .nav-link:hover span {
      color: #667eea;
    }

    .nav-link:hover .nav-link-bg {
      transform: scaleX(1);
    }

    .nav-link:hover::after {
      width: 60%;
    }

    .btn-nav-login {
      background: none;
      border: 2px solid #e2e8f0;
      color: #64748b;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      border-radius: 14px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }

    .btn-nav-login span {
      position: relative;
      z-index: 2;
      transition: color 0.3s ease;
    }

    .btn-ripple {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.2) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      transition: all 0.4s ease;
      border-radius: 50%;
    }

    .btn-nav-login:hover {
      border-color: #667eea;
      color: #667eea;
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
    }

    .btn-nav-login:hover span {
      color: #667eea;
    }

    .btn-nav-login:hover .btn-ripple {
      width: 120%;
      height: 120%;
    }

    .btn-nav-login:active {
      transform: translateY(-1px);
    }

    .btn-nav-signup {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 25px;
      font-weight: 700;
      font-size: 0.95rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.35);
      cursor: pointer;
    }

    .btn-nav-signup span {
      position: relative;
      z-index: 2;
    }

    .btn-glow {
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      border-radius: 27px;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 1;
    }

    .btn-nav-signup::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 2;
      border-radius: 25px;
    }

    .btn-nav-signup:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
    }

    .btn-nav-signup:hover .btn-glow {
      opacity: 1;
      animation: pulse 2s infinite;
    }

    .btn-nav-signup:hover::before {
      opacity: 1;
    }

    .btn-nav-signup:active {
      transform: translateY(-1px) scale(0.98);
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.7; }
      50% { opacity: 1; }
    }

    /* Account Dropdown */
    .account-dropdown {
      position: relative;
      cursor: pointer;
    }

    .account-trigger {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      transition: all 0.3s ease;
      border: 2px solid #e2e8f0;
    }

    .account-trigger:hover {
      border-color: #667eea;
      background: rgba(102, 126, 234, 0.05);
    }

    .account-text {
      font-weight: 600;
      color: #64748b;
      transition: color 0.3s ease;
    }

    .account-trigger:hover .account-text {
      color: #667eea;
    }

    .status-indicators {
      display: flex;
      gap: 0.25rem;
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

    .status-dot.pro {
      background: #ffd700;
      box-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
    }

    .status-dot.free {
      background: #ef4444;
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
    }

    .account-trigger i {
      font-size: 0.75rem;
      color: #94a3b8;
      transition: all 0.3s ease;
    }

    .account-trigger i.rotated {
      transform: rotate(180deg);
    }

    .dropdown-menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      border: 2px solid #667eea;
      min-width: 200px;
      z-index: 9999;
      display: none;
    }

    .dropdown-menu.open {
      display: block;
    }

    .dropdown-status {
      padding: 1rem;
      background: #f8fafc;
      border-radius: 12px 12px 0 0;
    }

    .status-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #64748b;
    }

    .status-item:last-child {
      margin-bottom: 0;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      color: #64748b;
      transition: all 0.3s ease;
      cursor: pointer;
      font-weight: 500;
    }

    .dropdown-item:hover {
      background: rgba(102, 126, 234, 0.05);
      color: #667eea;
    }

    .dropdown-item:first-child {
      border-radius: 12px 12px 0 0;
    }

    .dropdown-item:last-child {
      border-radius: 0 0 12px 12px;
    }

    .dropdown-item i {
      width: 16px;
      text-align: center;
    }

    .dropdown-item.upgrade-item {
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%);
      color: #d97706;
      font-weight: 600;
    }

    .dropdown-item.upgrade-item:hover {
      background: linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%);
      color: #f59e0b;
    }

    .dropdown-item.upgrade-item i {
      color: #ffd700;
    }

    .dropdown-divider {
      height: 1px;
      background: #e2e8f0;
      margin: 0.25rem 0;
    }

    /* Mobile Account Section */
    .mobile-account-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e2e8f0;
    }

    .mobile-account-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0;
      font-weight: 600;
      color: #64748b;
    }

    .mobile-status {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .status-text {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
      border-radius: 8px;
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
    }

    /* Hero Section */
    .hero-enhanced {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
    }

    .hero-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
    }

    .hero-gradient {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      opacity: 0.1;
    }

    .hero-pattern {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
    }

    .hero-layout {
      display: flex;
      align-items: center;
      gap: 6rem;
      min-height: calc(100vh - 100px);
      padding-top: 120px;
    }

    .hero-content {
      flex: 1;
      max-width: 600px;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 2rem;
      border: 1px solid rgba(102, 126, 234, 0.2);
    }

    .badge-icon {
      font-size: 1rem;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: #0f172a;
      min-height: 3.3rem;
    }

    .static-text {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      color: #64748b;
      line-height: 1.6;
      margin-bottom: 3rem;
    }

    .hero-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-bottom: 4rem;
    }

    .btn-primary-large {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 16px;
      font-size: 1.125rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .interactive-btn {
      position: relative;
      overflow: hidden;
    }

    .btn-primary-large:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 20px 40px rgba(102, 126, 234, 0.5);
    }

    .btn-primary-large:hover .btn-icon {
      transform: translateX(4px);
    }

    .btn-particles {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .btn-primary-large:hover .btn-particles {
      opacity: 1;
      animation: particleFloat 2s infinite;
    }

    @keyframes particleFloat {
      0%, 100% { transform: translateY(0) scale(1); }
      50% { transform: translateY(-2px) scale(1.05); }
    }

    .btn-icon {
      width: 20px;
      height: 20px;
    }

    .btn-secondary-large {
      background: rgba(255, 255, 255, 0.9);
      border: 2px solid rgba(102, 126, 234, 0.2);
      color: #64748b;
      padding: 1rem 2rem;
      border-radius: 16px;
      font-size: 1.125rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
    }

    .btn-secondary-large:hover {
      border-color: #667eea;
      color: #667eea;
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
      background: rgba(255, 255, 255, 1);
    }

    .play-button-inner {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .play-icon {
      width: 16px;
      height: 16px;
      color: white;
      margin-left: 2px;
    }

    .btn-secondary-large:hover .play-button-inner {
      transform: scale(1.1);
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }

    .play-icon {
      width: 20px;
      height: 20px;
    }

    .hero-stats {
      display: flex;
      gap: 3rem;
    }

    .stat {
      text-align: center;
    }

    .stat-number {
      font-size: 2rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      color: #64748b;
      font-size: 0.875rem;
    }

    /* Hero Visual */
    .hero-visual {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      min-height: 500px;
    }

    .floating-bg-elements {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .bg-element-1 {
      position: absolute;
      top: 10%;
      right: 10%;
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
    }

    .bg-element-2 {
      position: absolute;
      bottom: 20%;
      left: 15%;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, rgba(240, 147, 251, 0.15) 0%, rgba(245, 87, 108, 0.15) 100%);
      border-radius: 30%;
      animation: float 8s ease-in-out infinite reverse;
    }

    .bg-element-3 {
      position: absolute;
      top: 60%;
      right: 30%;
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%);
      border-radius: 20%;
      animation: float 10s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-20px) rotate(120deg); }
      66% { transform: translateY(10px) rotate(240deg); }
    }

    .hero-showcase {
      position: relative;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }

    .editor-preview {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .editor-header {
      background: #f8fafc;
      padding: 1rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
    }

    .editor-tabs {
      display: flex;
      gap: 1rem;
    }

    .tab {
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #64748b;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .tab.active {
      background: white;
      color: #667eea;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .editor-actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      cursor: pointer;
    }

    .action-dot.save { background: #10b981; }
    .action-dot.minimize { background: #f59e0b; }
    .action-dot.close { background: #ef4444; }

    .editor-content {
      display: flex;
      min-height: 400px;
    }

    .signature-canvas {
      flex: 2;
      padding: 2rem;
      background: #fafbfc;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .editor-sidebar {
      flex: 1;
      background: white;
      padding: 1.5rem;
      border-left: 1px solid #e2e8f0;
    }

    .tool-section {
      margin-bottom: 2rem;
    }

    .tool-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
      margin-bottom: 1rem;
    }

    .color-palette {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .color-dot {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.3s ease;
    }

    .color-dot:hover {
      border-color: #667eea;
      transform: scale(1.1);
    }

    .font-options {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .font-option {
      padding: 0.75rem;
      border-radius: 8px;
      background: #f8fafc;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .font-option.active {
      background: #667eea;
      color: white;
    }

    .font-option:hover:not(.active) {
      background: #e2e8f0;
    }

    .signature-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      transform: scale(0.9);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      width: 280px;
    }

    .signature-card.active {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.3);
      z-index: 2;
    }

    .signature-content {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .avatar {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      position: relative;
      overflow: hidden;
    }

    .pulse-animation {
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }
      100% { box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
    }

    .social-icons {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .social-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation: socialPulse 2s infinite;
    }

    .social-dot.linkedin { background: #0077b5; animation-delay: 0s; }
    .social-dot.twitter { background: #1da1f2; animation-delay: 0.3s; }
    .social-dot.instagram { background: #e4405f; animation-delay: 0.6s; }

    @keyframes socialPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.8; }
    }

    .contact-line {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
      font-size: 0.875rem;
      color: #64748b;
    }

    .email-icon {
      font-size: 1rem;
      color: #667eea;
    }

    .gradient-logo {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      position: relative;
      overflow: hidden;
    }

    .gradient-logo::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      animation: logoShine 3s infinite;
    }

    @keyframes logoShine {
      0% { left: -100%; }
      100% { left: 100%; }
    }

    .signature-indicators {
      display: flex;
      gap: 0.75rem;
      margin-top: 1.5rem;
      justify-content: center;
    }

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(102, 126, 234, 0.3);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .indicator.active {
      background: #667eea;
      transform: scale(1.2);
      box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    }

    .name {
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 0.25rem;
    }

    .title {
      color: #64748b;
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
    }

    .company {
      color: #667eea;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .signature-content.minimal {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .signature-content.corporate {
      gap: 1rem;
    }

    .logo-placeholder {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      border-radius: 8px;
    }

    /* Features Section */
    .features-enhanced {
      padding: 4rem 0;
      background: #fafbfc;
      display: flex;
      align-items: center;
      min-height: 80vh;
    }

    .section-header {
      text-align: center;
      max-width: 650px;
      margin: 0 auto 3rem;
    }

    .section-badge {
      display: inline-block;
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .section-header h2 {
      font-size: 3rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 1rem;
    }

    .section-header p {
      font-size: 1.125rem;
      color: #64748b;
      line-height: 1.6;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .feature-card {
      background: white;
      padding: 1.5rem;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1px solid #f1f5f9;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }

    .feature-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
      border-color: rgba(102, 126, 234, 0.2);
    }

    .feature-card:hover::before {
      opacity: 1;
    }

    .feature-hover-effect {
      position: absolute;
      top: var(--mouse-y, 50%);
      left: var(--mouse-x, 50%);
      width: 0;
      height: 0;
      background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s ease;
      pointer-events: none;
    }

    .feature-card:hover .feature-hover-effect {
      width: 200px;
      height: 200px;
    }

    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    .animate-on-scroll:nth-child(1) { transition-delay: 0.1s; }
    .animate-on-scroll:nth-child(2) { transition-delay: 0.2s; }
    .animate-on-scroll:nth-child(3) { transition-delay: 0.3s; }
    .animate-on-scroll:nth-child(4) { transition-delay: 0.4s; }
    .animate-on-scroll:nth-child(5) { transition-delay: 0.5s; }
    .animate-on-scroll:nth-child(6) { transition-delay: 0.6s; }
    .animate-on-scroll:nth-child(7) { transition-delay: 0.7s; }
    .animate-on-scroll:nth-child(8) { transition-delay: 0.8s; }

    .feature-icon {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      color: white;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .feature-icon::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.5s ease;
    }

    .feature-card:hover .feature-icon {
      transform: scale(1.1) rotate(5deg);
    }

    .feature-card:hover .feature-icon::after {
      left: 100%;
    }

    .feature-icon svg {
      width: 28px;
      height: 28px;
    }

    .gradient-blue { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .gradient-purple { background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%); }
    .gradient-green { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
    .gradient-orange { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
    .gradient-pink { background: linear-gradient(135deg, #ec4899 0%, #be185d 100%); }
    .gradient-teal { background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); }

    .feature-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #0f172a;
      margin-bottom: 0.75rem;
    }

    .feature-card p {
      color: #64748b;
      line-height: 1.6;
    }

    /* Mobile Navigation */
    .mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      padding: 0.5rem;
      border-radius: 12px;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .mobile-menu-toggle:hover {
      background: rgba(102, 126, 234, 0.1);
    }

    .hamburger {
      width: 24px;
      height: 18px;
      position: relative;
      cursor: pointer;
    }

    .hamburger span {
      display: block;
      position: absolute;
      height: 2px;
      width: 100%;
      background: #64748b;
      border-radius: 1px;
      opacity: 1;
      left: 0;
      transform: rotate(0deg);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .hamburger span:nth-child(1) {
      top: 0px;
    }

    .hamburger span:nth-child(2) {
      top: 8px;
    }

    .hamburger span:nth-child(3) {
      top: 16px;
    }

    .hamburger.active span:nth-child(1) {
      top: 8px;
      transform: rotate(135deg);
      background: #667eea;
    }

    .hamburger.active span:nth-child(2) {
      opacity: 0;
      left: -60px;
    }

    .hamburger.active span:nth-child(3) {
      top: 8px;
      transform: rotate(-135deg);
      background: #667eea;
    }

    .mobile-menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(30px);
      border-top: 1px solid rgba(102, 126, 234, 0.1);
      box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
      padding: 2rem;
      transform: translateY(-20px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .mobile-menu.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .mobile-nav-links {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .mobile-nav-link {
      color: #64748b;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }

    .mobile-nav-link::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 0;
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      transition: width 0.3s ease;
    }

    .mobile-nav-link:hover {
      color: #667eea;
      padding-left: 1rem;
    }

    .mobile-nav-link:hover::before {
      width: 4px;
    }

    .mobile-nav-link i {
      font-size: 0.9rem;
      opacity: 0.5;
      transition: all 0.3s ease;
    }

    .mobile-nav-link:hover i {
      opacity: 1;
      transform: translateX(4px);
    }

    .mobile-nav-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .btn-nav-login.mobile,
    .btn-nav-signup.mobile {
      width: 100%;
      justify-content: center;
      padding: 1rem 2rem;
      font-size: 1rem;
    }

    .btn-nav-login.mobile {
      border-radius: 12px;
    }

    .btn-nav-signup.mobile {
      border-radius: 12px;
    }

    /* Templates Section */
    .templates-section {
      padding: 6rem 0;
      background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
      position: relative;
    }

    .templates-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 25% 25%, rgba(102, 126, 234, 0.02) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(118, 75, 162, 0.02) 0%, transparent 50%);
      pointer-events: none;
    }

    .template-categories {
      display: flex;
      justify-content: center;
      gap: 1.5rem;
      margin-bottom: 3.5rem;
      flex-wrap: wrap;
      position: relative;
      z-index: 1;
    }

    .category-btn {
      background: rgba(255, 255, 255, 0.9);
      border: 2px solid rgba(226, 232, 240, 0.8);
      color: #475569;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-weight: 700;
      font-size: 0.9rem;
      letter-spacing: 0.3px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
    }

    .category-btn:hover {
      border-color: #667eea;
      color: #667eea;
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
      background: rgba(255, 255, 255, 1);
    }

    .category-btn.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: transparent;
      box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
      transform: translateY(-2px);
    }

    .templates-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2.5rem;
      margin-bottom: 4rem;
      position: relative;
      z-index: 1;
    }

    .template-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
    }

    .template-card:hover {
      transform: translateY(-12px) scale(1.02);
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.12);
      background: rgba(255, 255, 255, 1);
      border-color: rgba(102, 126, 234, 0.2);
    }

    .template-preview {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .template-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .template-content {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: white;
      padding: 1rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      max-width: 280px;
    }

    .template-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .template-avatar.corporate {
      background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
      border-radius: 8px;
    }

    .template-avatar.creative {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      border-radius: 20%;
    }

    .template-info {
      flex: 1;
    }

    .template-name {
      font-weight: 600;
      color: #0f172a;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    .template-title {
      color: #64748b;
      font-size: 0.8rem;
      margin-bottom: 0.25rem;
    }

    .template-company {
      color: #667eea;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .template-social {
      display: flex;
      gap: 0.25rem;
      margin-top: 0.5rem;
    }

    .social-icon {
      width: 16px;
      height: 16px;
      background: #667eea;
      color: white;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;
      font-weight: bold;
    }

    .template-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .template-card:hover .template-overlay {
      opacity: 1;
    }

    .preview-btn,
    .use-btn {
      background: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .use-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .preview-btn:hover,
    .use-btn:hover {
      transform: scale(1.05);
    }

    .pro-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
      color: #333;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.75rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      box-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
    }

    .template-details {
      padding: 2rem 1.5rem;
    }

    .template-details h3 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 0.75rem;
      letter-spacing: -0.01em;
    }

    .template-details p {
      color: #475569;
      font-size: 1rem;
      margin-bottom: 1.25rem;
      line-height: 1.6;
      font-weight: 400;
    }

    .template-tags {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .tag {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .templates-cta {
      text-align: center;
    }

    .btn-view-all {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 1.25rem 2.5rem;
      border-radius: 50px;
      font-weight: 700;
      font-size: 1rem;
      letter-spacing: 0.3px;
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
    }

    .btn-view-all:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 16px 48px rgba(102, 126, 234, 0.5);
    }

    /* Pricing Section */
    .pricing-section {
      padding: 8rem 0;
      background: white;
    }

    .pricing-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 4rem;
      position: relative;
    }

    .pricing-toggle span {
      font-weight: 600;
      color: #64748b;
      transition: color 0.3s ease;
    }

    .pricing-toggle span.active {
      color: #667eea;
    }

    .toggle-switch {
      width: 60px;
      height: 30px;
      background: #e2e8f0;
      border-radius: 15px;
      position: relative;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .toggle-switch:hover {
      background: #cbd5e1;
    }

    .toggle-slider {
      width: 26px;
      height: 26px;
      background: white;
      border-radius: 50%;
      position: absolute;
      top: 2px;
      left: 2px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .toggle-slider.annual {
      transform: translateX(30px);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .save-badge {
      position: absolute;
      top: -40px;
      right: -20px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.75rem;
      font-weight: bold;
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-5px); }
      60% { transform: translateY(-3px); }
    }

    .pricing-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-bottom: 6rem;
    }

    .pricing-card {
      background: white;
      border: 2px solid #f1f5f9;
      border-radius: 24px;
      padding: 2rem;
      position: relative;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .pricing-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
      border-color: rgba(102, 126, 234, 0.3);
    }

    .pricing-card.popular {
      border-color: #667eea;
      box-shadow: 0 15px 40px rgba(102, 126, 234, 0.2);
      transform: scale(1.05);
    }

    .popular-badge {
      position: absolute;
      top: -15px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    .card-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .card-header h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 1rem;
    }

    .price {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 0.25rem;
      margin-bottom: 0.5rem;
    }

    .currency {
      font-size: 1.5rem;
      font-weight: 600;
      color: #64748b;
    }

    .amount {
      font-size: 3rem;
      font-weight: 800;
      color: #0f172a;
    }

    .period {
      font-size: 1rem;
      color: #64748b;
    }

    .billing-note {
      font-size: 0.875rem;
      color: #10b981;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .card-header p {
      color: #64748b;
      line-height: 1.5;
    }

    .card-features {
      margin-bottom: 2rem;
    }

    .feature {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .feature:last-child {
      border-bottom: none;
    }

    .feature i {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
    }

    .feature .fa-check {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .feature.disabled {
      opacity: 0.5;
    }

    .feature.disabled .fa-times {
      background: #ef4444;
      color: white;
    }

    .plan-btn {
      width: 100%;
      padding: 1rem 2rem;
      border-radius: 16px;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.3s ease;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .free-btn {
      background: #f8fafc;
      border: 2px solid #e2e8f0;
      color: #64748b;
    }

    .free-btn:hover {
      background: #f1f5f9;
      border-color: #cbd5e1;
    }

    .pro-btn {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      color: white;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    .pro-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(102, 126, 234, 0.5);
    }

    .lifetime-btn {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      border: none;
      color: white;
      box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
    }

    .lifetime-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(245, 158, 11, 0.5);
    }

    .pricing-faq {
      max-width: 800px;
      margin: 0 auto;
    }

    .pricing-faq h3 {
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 3rem;
    }

    .faq-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .faq-item {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .faq-item:hover {
      border-color: #667eea;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1);
    }

    .faq-question {
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      color: #0f172a;
    }

    .faq-question i {
      transition: transform 0.3s ease;
      color: #667eea;
    }

    .faq-question i.rotated {
      transform: rotate(180deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: all 0.3s ease;
      background: #f8fafc;
    }

    .faq-answer.open {
      max-height: 200px;
    }

    .faq-answer p {
      padding: 0 1.5rem 1.5rem;
      color: #64748b;
      line-height: 1.6;
      margin: 0;
    }

    /* Quick Replies */
    .quick-replies {
      margin: 1rem 0;
      animation: slideUp 0.3s ease;
    }

    .quick-reply-title {
      font-size: 0.875rem;
      color: #64748b;
      margin-bottom: 0.75rem;
      text-align: center;
    }

    .quick-reply-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
    }

    .quick-reply-btn {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 1px solid #e2e8f0;
      color: #64748b;
      padding: 0.5rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .quick-reply-btn:hover {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-color: transparent;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }

    .quick-reply-btn i {
      font-size: 0.7rem;
    }

    /* Bot Response Formatting */
    .bot-response {
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .response-header {
      color: #667eea;
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(102, 126, 234, 0.2);
    }

    .feature-list,
    .support-list {
      margin: 0.5rem 0;
      padding-left: 0;
      list-style: none;
    }

    .feature-list li,
    .support-list li {
      padding: 0.25rem 0;
      color: #374151;
    }

    .steps-list {
      margin: 0.75rem 0;
      padding-left: 0;
      list-style: none;
    }

    .steps-list li {
      padding: 0.5rem 0;
      color: #374151;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .step-number {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: bold;
      flex-shrink: 0;
    }

    .pricing-options {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin: 0.75rem 0;
    }

    .price-item {
      background: rgba(102, 126, 234, 0.05);
      border-radius: 8px;
      padding: 0.75rem;
      border-left: 3px solid #667eea;
    }

    .plan-badge {
      display: block;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .price-item ul {
      margin: 0;
      padding-left: 1rem;
      list-style: none;
    }

    .price-item li {
      padding: 0.125rem 0;
      font-size: 0.8rem;
      color: #64748b;
    }

    .features-grid {
      display: grid;

      gap: 0.5rem;
      margin: 0.75rem 40px;
    }

    .feature-item,
    .category-item,
    .export-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem;
      background: rgba(102, 126, 234, 0.05);
      border-radius: 6px;
      font-size: 0.8rem;
    }

    .template-categories,
    .export-options {
      display: flex;

      gap: 0.5rem;
      margin: 0.75rem 0;
    }

    .highlight-text {
      background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
      padding: 0.5rem;
      border-radius: 6px;
      margin: 0.75rem 0;
      color: #667eea;
      font-size: 0.85rem;
      text-align: center;
    }

    .cta-text {
      color: #667eea;
      font-weight: 500;
      margin-top: 0.75rem;
      text-align: center;
      font-size: 0.85rem;
    }

    .success-note {
      background: rgba(16, 185, 129, 0.1);
      color: #10b981;
      padding: 0.5rem;
      border-radius: 6px;
      margin: 0.75rem 0;
      text-align: center;
      font-size: 0.85rem;
    }

    .upgrade-note {
      background: rgba(245, 158, 11, 0.1);
      color: #f59e0b;
      padding: 0.5rem;
      border-radius: 6px;
      margin: 0.75rem 0;
      text-align: center;
      font-size: 0.85rem;
    }

    .supported-clients {
      background: rgba(102, 126, 234, 0.05);
      padding: 0.5rem;
      border-radius: 6px;
      margin: 0.75rem 0;
      font-size: 0.8rem;
      color: #64748b;
      text-align: center;
    }

    .help-topics {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin: 0.75rem 0;
    }

    .topic-tag {
      background: rgba(102, 126, 234, 0.1);
      color: #667eea;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
    }



    /* Ripple Effect */
    .ripple-effect {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }

    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }

    /* AI Chatbot */
    .ai-chatbot {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1000;
    }

    .chatbot-toggle {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
      transition: all 0.3s ease;
    }

    .chatbot-toggle:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 35px rgba(102, 126, 234, 0.6);
    }

    .chatbot-window {
      position: absolute;
      bottom: 80px;
      right: 0;
      width: 350px;
      height: 500px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .chatbot-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .bot-avatar {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }

    .bot-name {
      font-weight: 600;
      font-size: 1rem;
    }

    .bot-status {
      font-size: 0.875rem;
      opacity: 0.9;
    }

    .chatbot-messages {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .message {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      animation: messageSlide 0.3s ease;
    }

    @keyframes messageSlide {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .message-avatar {
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.875rem;
      flex-shrink: 0;
    }

    .message-content {
      background: #f1f5f9;
      padding: 0.75rem 1rem;
      border-radius: 18px;
      max-width: 80%;
      font-size: 0.875rem;
      line-height: 1.4;
    }

    .message-content.user {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      margin-left: auto;
      border-radius: 18px 18px 4px 18px;
    }

    .bot-message .message-content {
      border-radius: 18px 18px 18px 4px;
    }

    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .typing-dots {
      display: flex;
      gap: 0.25rem;
      padding: 0.75rem 1rem;
      background: #f1f5f9;
      border-radius: 18px 18px 18px 4px;
    }

    .typing-dots span {
      width: 6px;
      height: 6px;
      background: #94a3b8;
      border-radius: 50%;
      animation: typingDot 1.4s infinite;
    }

    .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
    .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes typingDot {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-10px); }
    }

    .chatbot-input {
      padding: 1rem;
      border-top: 1px solid #e2e8f0;
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    .chat-input {
      flex: 1;
      border: 1px solid #e2e8f0;
      border-radius: 25px;
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      outline: none;
      transition: border-color 0.3s ease;
    }

    .chat-input:focus {
      border-color: #667eea;
    }

    .send-btn {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 50%;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .send-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .template-image-display {
      width: 100%;
      height: 125%;
      object-fit: cover;
      border-radius: 12px;
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .nav-links {
        gap: 1.5rem;
      }
      
      .btn-nav-login,
      .btn-nav-signup {
        padding: 0.6rem 1.2rem;
        font-size: 0.9rem;
      }
    }

    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
      
      .mobile-menu-toggle {
        display: block;
      }
      
      .navbar-enhanced {
        padding: 1rem 0;
      }
      
      .navbar-enhanced.scrolled {
        padding: 0.7rem 0;
      }
      
      .hero-layout {
        flex-direction: column;
        gap: 2rem;
        text-align: center;
      }
      
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-actions {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
      }
      
      .btn-primary-large,
      .btn-secondary-large {
        justify-content: center;
        padding: 1.2rem 2rem;
      }
      
      .hero-stats {
        justify-content: center;
        gap: 2rem;
      }
      
      .hero-visual {
        order: -1;
      }
      
      .section-header h2 {
        font-size: 2rem;
      }

      .mobile-nav-link:hover {
        padding-left: 0.5rem;
      }
      
      .editor-content {
        flex-direction: column;
      }
                                                    
      .editor-sidebar {
        border-left: none;
        border-top: 1px solid #e2e8f0;
      }
      
      .chatbot-window {
        width: 300px;
        height: 400px;
      }
      
      .template-categories {
        gap: 0.5rem;
      }
      
      .category-btn {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }
      
      .templates-grid {
        grid-template-columns: 1fr;
      }
      
      .pricing-cards {
        grid-template-columns: 1fr;
      }
      
      .pricing-card.popular {
        transform: none;
      }
      
      .pricing-toggle {
        flex-wrap: wrap;
        gap: 0.5rem;
      }
    }

    @media (max-width: 480px) {
      .ai-chatbot {
        bottom: 1rem;
        right: 1rem;
      }
      
      .chatbot-window {
        width: calc(100vw - 2rem);
        right: -1rem;
      }
      
      .hero-title {
        font-size: 2rem;
      }
      
      .template-content {
        padding: 0.75rem;
        max-width: 240px;
      }
      
      .template-avatar {
        width: 40px;
        height: 40px;
      }
      
      .amount {
        font-size: 2.5rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
      
      .pricing-options {
        gap: 0.5rem;
      }
      
      .price-item {
        padding: 0.5rem;
      }
    }
  `]
})
export class EnhancedHomepageComponent implements OnInit {
  mobileMenuOpen = false;
  isScrolled = false;
  currentSignatureIndex = 0;

  mousePosition = { x: 0, y: 0 };
  parallaxElements: NodeListOf<Element> | null = null;
  chatbotOpen = false;
  userMessage = '';
  chatbotTyping = false;
  chatMessages: Array<{type: 'user' | 'bot', content: string}> = [
    { type: 'bot', content: 'Hi! I\'m SignatureBot 👋 I can help you with questions about our email signature generator!' }
  ];
  
  showQuickReplies = true;
  
  quickReplies = [
    { text: 'Pricing Plans', icon: 'fas fa-dollar-sign', query: 'What are your pricing plans?' },
    { text: 'Free Templates', icon: 'fas fa-gift', query: 'What free templates do you offer?' },
    { text: 'How to Start', icon: 'fas fa-play-circle', query: 'How do I get started?' },
    { text: 'PRO Features', icon: 'fas fa-crown', query: 'What PRO features do you have?' },
    { text: 'Export Options', icon: 'fas fa-download', query: 'How can I export my signature?' },
    { text: 'Support Help', icon: 'fas fa-life-ring', query: 'Do you provide customer support?' }
  ];
  
  activeCategory = 'all';
  isAnnual = false;
  
  templates = [
    {
      id: 1,
      name: 'Custom Template',
      description: 'Your custom signature template',
      category: 'modern',
      isPro: false,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
      avatarClass: '',
      sampleName: 'Your Name',
      sampleTitle: 'Your Title',
      sampleCompany: 'Your Company',
      showSocial: true,
      tags: ['Custom', 'Personal'],
      imageUrl: 'assets/im1.png'
    },
    {
      id: 2,
      name: 'Corporate Executive',
      description: 'Professional corporate design for executives',
      category: 'corporate',
      isPro: true,
      gradient: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
      avatarClass: '',
      sampleName: 'Your Name',
      sampleTitle: 'Your Title',
      sampleCompany: 'Your Company',
      showSocial: true,
      tags: ['Custom', 'Personal'],
      imageUrl: 'assets/im2.png'

    },
    {
      id: 3,
      name: 'Creative Designer',
      description: 'Vibrant and creative design for designers and artists',
      category: 'creative',
      isPro: true,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      avatarClass: 'creative',
      sampleName: 'Your Name',
      sampleTitle: 'Your Title',
      sampleCompany: 'Your Company',
      showSocial: true,
      tags: ['Creative', 'Colorful', 'Artistic'],
      imageUrl: 'assets/im3.png'
    },
    {
      id: 4,
      name: 'Minimal Clean',
      description: 'Simple and clean design for minimalists',
      category: 'minimal',
      isPro: false,
      gradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      avatarClass: '',
      sampleName: 'Emma Wilson',
      sampleTitle: 'Product Manager',
      sampleCompany: 'InnovateCorp',
      showSocial: false,
      tags: ['Minimal', 'Simple', 'Clean']
    },
    {
      id: 5,
      name: 'Tech Startup',
      description: 'Modern tech-focused design for startups',
      category: 'modern',
      isPro: true,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      avatarClass: '',
      sampleName: 'David Kim',
      sampleTitle: 'CTO',
      sampleCompany: 'TechStart',
      showSocial: true,
      tags: ['Tech', 'Startup', 'Modern']
    },
    {
      id: 6,
      name: 'Elegant Professional',
      description: 'Elegant and sophisticated design',
      category: 'corporate',
      isPro: false,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
      avatarClass: '',
      sampleName: 'Lisa Anderson',
      sampleTitle: 'Marketing Director',
      sampleCompany: 'Global Corp',
      showSocial: true,
      tags: ['Elegant', 'Sophisticated', 'Professional']
    }
  ];
  
  pricingFaqs = [
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. Your account will remain active until the end of your billing period.',
      open: false
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for all paid plans. If you\'re not satisfied, contact us for a full refund.',
      open: false
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through Stripe.',
      open: false
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the next billing cycle.',
      open: false
    },
    {
      question: 'Is there a team discount available?',
      answer: 'Yes, we offer special pricing for teams of 5 or more users. Contact our sales team for custom pricing.',
      open: false
    }
  ];

  accountDropdownOpen = false;

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('click', this.onDocumentClick.bind(this));

    this.startSignatureRotation();
    this.initParallaxElements();
    this.initIntersectionObserver();
  }

  onScroll() {
    this.isScrolled = window.scrollY > 50;
    this.updateParallax();
  }

  onMouseMove(event: MouseEvent) {
    this.mousePosition.x = event.clientX;
    this.mousePosition.y = event.clientY;
    this.updateFloatingElements();
  }



  startSignatureRotation() {
    setInterval(() => {
      this.currentSignatureIndex = (this.currentSignatureIndex + 1) % 3;
    }, 4000);
  }

  initParallaxElements() {
    this.parallaxElements = document.querySelectorAll('.parallax-element');
  }

  updateParallax() {
    if (this.parallaxElements) {
      const scrolled = window.pageYOffset;
      this.parallaxElements.forEach((element: any) => {
        const rate = scrolled * -0.5;
        element.style.transform = `translateY(${rate}px)`;
      });
    }
  }

  updateFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((element: any, index) => {
      const x = (this.mousePosition.x - window.innerWidth / 2) * (0.1 + index * 0.05);
      const y = (this.mousePosition.y - window.innerHeight / 2) * (0.1 + index * 0.05);
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(el => observer.observe(el));
    }, 100);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : 'auto';
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    document.body.style.overflow = 'auto';
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.closeMobileMenu();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  getStarted() {
    this.router.navigate(['/register']);
  }

  onFeatureHover(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  }

  createRipple(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  onFeatureLeave(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    if (element && element.style) {
      element.style.removeProperty('--mouse-x');
      element.style.removeProperty('--mouse-y');
    }
  }

  toggleChatbot() {
    this.chatbotOpen = !this.chatbotOpen;
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;
    
    this.chatMessages.push({ type: 'user', content: this.userMessage });
    const userMsg = this.userMessage.toLowerCase();
    this.userMessage = '';
    this.showQuickReplies = false;
    
    this.chatbotTyping = true;
    setTimeout(() => {
      this.chatbotTyping = false;
      const response = this.getBotResponse(userMsg);
      this.chatMessages.push({ type: 'bot', content: response });
      
      // Show follow-up quick replies after bot response
      setTimeout(() => {
        this.showQuickReplies = true;
      }, 1000);
    }, 1500);
  }
  
  selectQuickReply(reply: any) {
    this.userMessage = reply.query;
    this.sendMessage();
  }

  get filteredTemplates() {
    if (this.activeCategory === 'all') {
      return this.templates;
    }
    return this.templates.filter(template => template.category === this.activeCategory);
  }
  
  setActiveCategory(category: string) {
    this.activeCategory = category;
  }
  
  previewTemplate(template: any) {
    if (template.id === 1) {
      this.router.navigate(['/temp1']);
    } else if (template.id === 2) {
      this.router.navigate(['/temp2']);
    }
    else if (template.id === 3) {
      this.router.navigate(['/temp3']);
    } else {
      // For other templates, show preview in signature creator with preview mode
      this.router.navigate(['/signature-creator'], { queryParams: { template: template.id, mode: 'preview' } });
    }
  }
  
  viewAllTemplates() {
    this.router.navigate(['/templates']);
  }
  
  togglePricing() {
    this.isAnnual = !this.isAnnual;
  }
  
  selectPlan(plan: string) {
    console.log('Selected plan:', plan);
    if (plan === 'free') {
      this.router.navigate(['/register']);
    } else {
      this.router.navigate(['/register'], { queryParams: { plan } });
    }
  }
  
  toggleFaq(faq: any) {
    faq.open = !faq.open;
  }

  useTemplate(templateId: number) {
    if (templateId === 1) {
      this.router.navigate(['/editor'], { queryParams: { template: 'temp1' } });
      setTimeout(() => window.scrollTo(0, 0), 0);
    } else if (templateId === 2) {
      this.router.navigate(['/editor'], { queryParams: { template: 'temp2' } });
      setTimeout(() => window.scrollTo(0, 0), 0);
    } else {
      this.router.navigate(['/signature-creator'], { queryParams: { template: templateId } });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleAccountDropdown() {
    this.accountDropdownOpen = !this.accountDropdownOpen;
    console.log('Dropdown state:', this.accountDropdownOpen);
  }

  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.account-dropdown')) {
      this.accountDropdownOpen = false;
    }
  }

  goToMySignatures() {
    this.accountDropdownOpen = false;
    this.router.navigate(['/my-signatures']);
  }

  goToPricing() {
    this.accountDropdownOpen = false;
    this.scrollToSection('pricing');
  }

  goToProfile() {
    this.accountDropdownOpen = false;
    this.router.navigate(['/profile']);
  }

  goToAdminDashboard() {
    this.accountDropdownOpen = false;
    this.router.navigate(['/admin']);
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.email === 'admin@gmail.com';
  }

  getBotResponse(message: string): string {
    if (message.includes('pricing') || message.includes('price') || message.includes('cost') || message.includes('plans')) {
      return '💰 Our pricing is simple:\n\n🆓 **Free**: 5 basic templates, basic editor\n👑 **PRO Monthly**: $9.99/month - 100+ templates, analytics\n⭐ **Lifetime**: $29.99 one-time - Everything forever!\n\nWant to see all features? Just ask!';
    }
    if (message.includes('free') && message.includes('template')) {
      return '🎁 Our free plan includes:\n\n• 5 professional templates\n• Basic drag & drop editor\n• HTML export\n• Email support\n\nUpgrade to PRO for 100+ premium templates and advanced features!';
    }
    if (message.includes('pro') && message.includes('feature')) {
      return '👑 PRO features include:\n\n✨ 100+ premium templates\n📊 Analytics & click tracking\n👥 Team management\n🎨 Advanced customization\n📱 Mobile optimization\n⚡ Priority support\n\nReady to upgrade?';
    }
    if (message.includes('feature') || message.includes('what can')) {
      return '🚀 Key features:\n\n🎨 100+ professional templates\n✏️ Drag & drop editor\n📱 Mobile responsive designs\n🔗 Social media integration\n📊 Analytics tracking\n👥 Team management\n\nAll with real-time preview!';
    }
    if (message.includes('template') || message.includes('design')) {
      return '🎨 We offer 100+ templates:\n\n💼 Corporate & Professional\n🎯 Modern & Creative\n✨ Minimal & Clean\n🚀 Tech & Startup\n\nAll templates are mobile-responsive and fully customizable!';
    }
    if (message.includes('start') || message.includes('begin') || message.includes('how')) {
      return '🚀 Getting started is super easy:\n\n1️⃣ Click "Get Started Free"\n2️⃣ Choose your favorite template\n3️⃣ Add your details & customize\n4️⃣ Export and use!\n\nNo credit card required for free plan! 🎉';
    }
    if (message.includes('support') || message.includes('help')) {
      return '🆘 We\'ve got you covered:\n\n💬 24/7 live chat support\n📧 Email support\n📚 Help center with tutorials\n🎥 Video guides\n❓ FAQ section\n\nNeed help with something specific?';
    }
    if (message.includes('export') || message.includes('download')) {
      return '📤 Export options:\n\n💻 HTML code (copy & paste)\n🖼️ PNG image\n📧 Direct email client setup\n\nSupported: Gmail, Outlook, Apple Mail, Thunderbird & more!';
    }
    return '🤖 I can help you with:\n\n💰 Pricing & plans\n🎨 Templates & designs\n🚀 Getting started\n👑 PRO features\n📤 Export options\n🆘 Support\n\nWhat interests you most?';
  }
}