import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-oauth2-success',
  template: `
    <div class="oauth-success">
      <div class="loading-spinner">
        <i class="fas fa-spinner fa-spin"></i>
        <p>Completing sign in...</p>
      </div>
    </div>
  `,
  styles: [`
    .oauth-success {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .loading-spinner {
      text-align: center;
      color: white;
    }
    
    .loading-spinner i {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  `]
})
export class OAuth2SuccessComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        // Store token and redirect to enhanced homepage
        localStorage.setItem('token', token);
        this.authService.setToken(token);
        
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}