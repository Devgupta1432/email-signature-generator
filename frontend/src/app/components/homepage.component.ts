import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  template: `
    <div class="homepage">
      <!-- Navigation -->
      <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container">
          <a class="navbar-brand" href="#">
            <i class="fas fa-signature text-primary me-2"></i>
            <strong>SignaturePro</strong>
          </a>
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" href="#features">Features</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#templates">Templates</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#pricing">Pricing</a>
              </li>
              <li class="nav-item">
                <button class="btn btn-outline-primary me-2" (click)="goToLogin()">Login</button>
              </li>
              <li class="nav-item">
                <button class="btn btn-primary" (click)="goToRegister()">Sign Up Free</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero-section">
        <div class="container">
          <div class="row align-items-center min-vh-100">
            <div class="col-lg-6">
              <div class="hero-content">
                <h1 class="hero-title">
                  Create Professional 
                  <span class="text-primary">Email Signatures</span>
                  in Minutes
                </h1>
                <p class="hero-description">
                  Design stunning email signatures with our easy-to-use editor. 
                  Choose from 50+ professional templates and customize them to match your brand.
                </p>
                <div class="hero-buttons">
                  <button class="btn btn-primary btn-lg me-3" (click)="getStarted()">
                    <i class="fas fa-rocket me-2"></i>
                    Get Started Free
                  </button>
                  <button class="btn btn-outline-secondary btn-lg" (click)="viewTemplates()">
                    <i class="fas fa-eye me-2"></i>
                    View Templates
                  </button>
                </div>
                <div class="hero-stats">
                  <div class="stat-item">
                    <strong>10,000+</strong>
                    <span>Happy Users</span>
                  </div>
                  <div class="stat-item">
                    <strong>50+</strong>
                    <span>Templates</span>
                  </div>
                  <div class="stat-item">
                    <strong>99.9%</strong>
                    <span>Uptime</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="hero-image">
                <div class="signature-preview-demo">
                  <div class="demo-signature">
                    <div class="signature-content">
                      <div class="name">John Smith</div>
                      <div class="title">Marketing Manager</div>
                      <div class="company">TechCorp Inc.</div>
                      <div class="contact-info">
                        <div>📧 john@techcorp.com</div>
                        <div>📱 +1 (555) 123-4567</div>
                        <div>🌐 www.techcorp.com</div>
                      </div>
                      <div class="social-links">
                        <span class="social-icon linkedin"></span>
                        <span class="social-icon twitter"></span>
                        <span class="social-icon facebook"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="features-section">
        <div class="container">
          <div class="section-header text-center">
            <h2>Why Choose SignaturePro?</h2>
            <p>Everything you need to create professional email signatures</p>
          </div>
          
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="fas fa-palette"></i>
                </div>
                <h4>50+ Professional Templates</h4>
                <p>Choose from a wide variety of professionally designed templates for every industry and style.</p>
              </div>
            </div>
            
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="fas fa-mobile-alt"></i>
                </div>
                <h4>Mobile Responsive</h4>
                <p>Your signatures look perfect on all devices - desktop, tablet, and mobile email clients.</p>
              </div>
            </div>
            
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="fas fa-share-alt"></i>
                </div>
                <h4>Social Media Integration</h4>
                <p>Add your social media profiles with beautiful icons that match your signature design.</p>
              </div>
            </div>
            
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="fas fa-code"></i>
                </div>
                <h4>Easy Export</h4>
                <p>Export your signature as HTML, image, or copy directly to your email client with one click.</p>
              </div>
            </div>
            
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="fas fa-shield-alt"></i>
                </div>
                <h4>Secure & Private</h4>
                <p>Your data is encrypted and secure. We never share your information with third parties.</p>
              </div>
            </div>
            
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="feature-card">
                <div class="feature-icon">
                  <i class="fas fa-headset"></i>
                </div>
                <h4>24/7 Support</h4>
                <p>Get help whenever you need it with our dedicated customer support team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Templates Section -->
      <section id="templates" class="templates-section">
        <div class="container">
          <div class="section-header text-center">
            <h2>Professional Templates</h2>
            <p>Choose from our collection of beautiful, responsive templates</p>
          </div>
          
          <div class="row">
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="template-card">
                <div class="template-preview modern">
                  <div class="template-content">
                    <div class="name">Sarah Johnson</div>
                    <div class="title">UX Designer</div>
                    <div class="company">Creative Studio</div>
                  </div>
                </div>
                <div class="template-info">
                  <h5>Modern Professional</h5>
                  <span class="badge bg-success">Free</span>
                </div>
              </div>
            </div>
            
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="template-card">
                <div class="template-preview classic">
                  <div class="template-content">
                    <div class="name">Michael Brown</div>
                    <div class="title">Senior Developer</div>
                    <div class="company">Tech Solutions</div>
                  </div>
                </div>
                <div class="template-info">
                  <h5>Classic Business</h5>
                  <span class="badge bg-success">Free</span>
                </div>
              </div>
            </div>
            
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="template-card">
                <div class="template-preview premium">
                  <div class="template-content">
                    <div class="name">Emma Wilson</div>
                    <div class="title">Marketing Director</div>
                    <div class="company">Global Corp</div>
                  </div>
                </div>
                <div class="template-info">
                  <h5>Premium Animated</h5>
                  <span class="badge bg-warning">PRO</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="text-center">
            <button class="btn btn-primary btn-lg" (click)="viewAllTemplates()">
              View All Templates
            </button>
          </div>
        </div>
      </section>

      <!-- Pricing Section -->
      <section id="pricing" class="pricing-section">
        <div class="container">
          <div class="section-header text-center">
            <h2>Simple, Transparent Pricing</h2>
            <p>Choose the plan that works best for you</p>
          </div>
          
          <div class="row justify-content-center">
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="pricing-card">
                <div class="pricing-header">
                  <h3>Free</h3>
                  <div class="price">
                    <span class="amount">$0</span>
                    <span class="period">/month</span>
                  </div>
                </div>
                <ul class="pricing-features">
                  <li><i class="fas fa-check text-success"></i> 5 Signatures</li>
                  <li><i class="fas fa-check text-success"></i> Basic Templates</li>
                  <li><i class="fas fa-check text-success"></i> Standard Fonts</li>
                  <li><i class="fas fa-check text-success"></i> Email Support</li>
                </ul>
                <button class="btn btn-outline-primary w-100" (click)="getStarted()">
                  Get Started
                </button>
              </div>
            </div>
            
            <div class="col-lg-4 col-md-6 mb-4">
              <div class="pricing-card featured">
                <div class="pricing-badge">Most Popular</div>
                <div class="pricing-header">
                  <h3>PRO</h3>
                  <div class="price">
                    <span class="amount">$9.99</span>
                    <span class="period">/month</span>
                  </div>
                </div>
                <ul class="pricing-features">
                  <li><i class="fas fa-check text-success"></i> Unlimited Signatures</li>
                  <li><i class="fas fa-check text-success"></i> All Templates</li>
                  <li><i class="fas fa-check text-success"></i> Custom Fonts</li>
                  <li><i class="fas fa-check text-success"></i> Animated Templates</li>
                  <li><i class="fas fa-check text-success"></i> Priority Support</li>
                </ul>
                <button class="btn btn-primary w-100" (click)="upgradeToPro()">
                  Upgrade to PRO
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-lg-4">
              <div class="footer-brand">
                <i class="fas fa-signature text-primary me-2"></i>
                <strong>SignaturePro</strong>
              </div>
              <p>Create professional email signatures that make a lasting impression.</p>
            </div>
            <div class="col-lg-2">
              <h6>Product</h6>
              <ul class="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#templates">Templates</a></li>
                <li><a href="#pricing">Pricing</a></li>
              </ul>
            </div>
            <div class="col-lg-2">
              <h6>Support</h6>
              <ul class="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div class="col-lg-2">
              <h6>Legal</h6>
              <ul class="footer-links">
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
              </ul>
            </div>
            <div class="col-lg-2">
              <h6>Connect</h6>
              <div class="social-links">
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-facebook"></i></a>
                <a href="#"><i class="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
          <hr>
          <div class="text-center">
            <p>&copy; 2024 SignaturePro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .homepage {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }

    /* Navigation */
    .navbar-brand {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .navbar-nav .nav-link {
      font-weight: 500;
      margin: 0 0.5rem;
    }

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      position: relative;
      overflow: hidden;
      min-height: 100vh;
    }

    .hero-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.1);
    }

    .hero-section::after {
      content: '';
      position: absolute;
      bottom: -50px;
      left: -50px;
      width: 200px;
      height: 200px;
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
    }

    .hero-content {
      position: relative;
      z-index: 2;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1.5rem;
      animation: fadeInUp 1s ease-out;
    }

    .hero-title span {
      background: linear-gradient(45deg, #fff, #e3f2fd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-description {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      animation: fadeInUp 1s ease-out 0.3s both;
    }

    .hero-buttons {
      margin-bottom: 3rem;
      animation: fadeInUp 1s ease-out 0.6s both;
    }

    .hero-buttons .btn {
      margin: 0.5rem;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      border-radius: 50px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .hero-buttons .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    }

    .hero-stats {
      display: flex;
      gap: 2rem;
    }

    .stat-item {
      text-align: center;
    }

    .stat-item strong {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .stat-item span {
      opacity: 0.8;
      font-size: 0.9rem;
    }

    /* Demo Signature */
    .signature-preview-demo {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      transform: rotate(3deg);
      animation: float 4s ease-in-out infinite;
      position: relative;
    }

    .signature-preview-demo::before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      background: linear-gradient(45deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1));
      border-radius: 20px;
      z-index: -1;
    }

    .demo-signature {
      font-family: Arial, sans-serif;
      color: #333;
    }

    .demo-signature .name {
      font-size: 1.2rem;
      font-weight: bold;
      color: #007bff;
      margin-bottom: 0.25rem;
    }

    .demo-signature .title {
      color: #6c757d;
      margin-bottom: 0.25rem;
    }

    .demo-signature .company {
      font-weight: 500;
      margin-bottom: 0.75rem;
    }

    .demo-signature .contact-info div {
      margin-bottom: 0.25rem;
      font-size: 0.9rem;
    }

    .social-links {
      margin-top: 0.75rem;
    }

    .social-icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 3px;
      margin-right: 0.5rem;
    }

    .social-icon.linkedin { background: #0077b5; }
    .social-icon.twitter { background: #1da1f2; }
    .social-icon.facebook { background: #1877f2; }

    /* Sections */
    .features-section, .templates-section, .pricing-section {
      padding: 5rem 0;
    }

    .section-header {
      margin-bottom: 4rem;
    }

    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .section-header p {
      font-size: 1.1rem;
      color: #6c757d;
    }

    /* Feature Cards */
    .feature-card {
      text-align: center;
      padding: 2rem;
      border-radius: 15px;
      background: white;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
      transition: transform 0.3s ease;
      height: 100%;
    }

    .feature-card:hover {
      transform: translateY(-5px);
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }

    .feature-icon i {
      font-size: 2rem;
      color: white;
    }

    .feature-card h4 {
      font-weight: 600;
      margin-bottom: 1rem;
    }

    /* Template Cards */
    .template-card {
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
      transition: transform 0.3s ease;
    }

    .template-card:hover {
      transform: translateY(-5px);
    }

    .template-preview {
      height: 200px;
      padding: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .template-preview.modern {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
    }

    .template-preview.classic {
      background: linear-gradient(135deg, #f093fb, #f5576c);
      color: white;
    }

    .template-preview.premium {
      background: linear-gradient(135deg, #4facfe, #00f2fe);
      color: white;
    }

    .template-content .name {
      font-weight: bold;
      font-size: 1.1rem;
      margin-bottom: 0.25rem;
    }

    .template-info {
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Pricing Cards */
    .pricing-card {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
      position: relative;
      transition: transform 0.3s ease;
    }

    .pricing-card:hover {
      transform: translateY(-5px);
    }

    .pricing-card.featured {
      border: 2px solid #007bff;
      transform: scale(1.05);
    }

    .pricing-badge {
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      background: #007bff;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .pricing-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .pricing-header h3 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .price .amount {
      font-size: 3rem;
      font-weight: 700;
      color: #007bff;
    }

    .price .period {
      color: #6c757d;
    }

    .pricing-features {
      list-style: none;
      padding: 0;
      margin-bottom: 2rem;
    }

    .pricing-features li {
      padding: 0.5rem 0;
      display: flex;
      align-items: center;
    }

    .pricing-features i {
      margin-right: 0.75rem;
    }

    /* Footer */
    .footer {
      background: #2c3e50;
      color: white;
      padding: 3rem 0 1rem;
    }

    .footer-brand {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .footer h6 {
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .footer-links {
      list-style: none;
      padding: 0;
    }

    .footer-links li {
      margin-bottom: 0.5rem;
    }

    .footer-links a {
      color: #bdc3c7;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: white;
    }

    .social-links a {
      display: inline-block;
      width: 40px;
      height: 40px;
      background: #34495e;
      border-radius: 50%;
      text-align: center;
      line-height: 40px;
      margin-right: 0.5rem;
      color: white;
      transition: background 0.3s ease;
    }

    .social-links a:hover {
      background: #007bff;
    }

    /* Responsive */
    /* Animations */
    @keyframes float {
      0%, 100% { transform: rotate(3deg) translateY(0px); }
      50% { transform: rotate(3deg) translateY(-10px); }
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

    /* Responsive */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-stats {
        justify-content: center;
      }
      
      .signature-preview-demo {
        transform: none;
        margin-top: 2rem;
      }
      
      .hero-buttons .btn {
        display: block;
        width: 100%;
        margin: 0.5rem 0;
      }
    }
  `]
})
export class HomepageComponent {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  getStarted() {
    this.router.navigate(['/register']);
  }

  viewTemplates() {
    this.router.navigate(['/templates']);
  }

  viewAllTemplates() {
    this.router.navigate(['/templates']);
  }

  upgradeToPro() {
    this.router.navigate(['/pricing']);
  }
}