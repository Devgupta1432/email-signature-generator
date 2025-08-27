import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): boolean {
    console.log('AdminGuard: Checking access');
    
    if (!this.authService.isAuthenticated()) {
      console.log('AdminGuard: Not authenticated');
      this.router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('AdminGuard: User data:', user);
    
    if (user.email === 'admin@gmail.com' || user.role === 'ADMIN' || user.role === 'admin') {
      console.log('AdminGuard: Access granted');
      return true;
    }

    console.log('AdminGuard: Access denied, redirecting to home');
    this.router.navigate(['/']);
    return false;
  }
}