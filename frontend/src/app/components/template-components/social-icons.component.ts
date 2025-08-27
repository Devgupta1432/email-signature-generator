import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sig-social-icons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="social-icons" [ngStyle]="containerStyles">
      <a *ngIf="userData.linkedin" 
         [href]="userData.linkedin" 
         target="_blank" 
         class="social-link"
         [ngStyle]="getIconWrapperStyles('linkedin')">
        <i class="fab fa-linkedin-in" [ngStyle]="getIconColor('linkedin')"></i>
      </a>
      <a *ngIf="userData.twitter" 
         [href]="userData.twitter" 
         target="_blank" 
         class="social-link"
         [ngStyle]="getIconWrapperStyles('twitter')">
        <i class="fab fa-twitter" [ngStyle]="getIconColor('twitter')"></i>
      </a>
      <a *ngIf="userData.facebook" 
         [href]="userData.facebook" 
         target="_blank" 
         class="social-link"
         [ngStyle]="getIconWrapperStyles('facebook')">
        <i class="fab fa-facebook-f" [ngStyle]="getIconColor('facebook')"></i>
      </a>
    </div>
  `,
  styles: [`
    .social-icons {
      display: flex;
      gap: 0.5rem;
    }
    .social-link {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    .social-link:hover {
      transform: scale(1.1);
    }
  `]
})
export class SocialIconsComponent {
  @Input() userData: any = {};
  @Input() style: 'minimal' | 'colorful' | 'outlined' = 'colorful';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() containerStyles: any = {};
  @Input() primaryColor: string = '';

  get iconStyles() {
    const sizes = {
      small: { width: '24px', height: '24px', fontSize: '12px' },
      medium: { width: '32px', height: '32px', fontSize: '16px' },
      large: { width: '40px', height: '40px', fontSize: '20px' }
    };
    return sizes[this.size];
  }

  getIconWrapperStyles(platform: string) {
    const sizes = {
      small: { width: '28px', height: '28px', fontSize: '14px' },
      medium: { width: '36px', height: '36px', fontSize: '18px' },
      large: { width: '44px', height: '44px', fontSize: '22px' }
    };
    
    const baseStyles = {
      ...sizes[this.size],
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      transition: 'all 0.3s ease'
    };
    
    return {
      ...baseStyles,
      backgroundColor: this.primaryColor || '#000000',
      color: 'white'
    };
  }

  getIconColor(platform: string) {
    return { color: 'inherit' };
  }
}