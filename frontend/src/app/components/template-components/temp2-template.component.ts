import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'temp2-template',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="signature-wrapper" [style.background-color]="designOptions?.primaryColor ? '#f9f6f4' : '#f9f6f4'">
      <!-- Left side: profile image -->
      <div class="signature-left">
        <img [src]="userData.logo || 'https://via.placeholder.com/150x210/667eea/ffffff?text=Profile'"
             alt="Profile Picture" class="profile-img">
      </div>

      <!-- Right side: name, designation, and contacts -->
      <div class="signature-right">
        <div class="name" *ngIf="getFullName()" [style.color]="designOptions?.primaryColor || '#000'" 
             [style.font-size.px]="(designOptions?.fontSize || 14) + 14">
          {{ getFullName() }}
        </div>
        <div class="designation" *ngIf="userData.designation" [style.color]="designOptions?.primaryColor || '#000'"
             [style.font-size.px]="designOptions?.fontSize || 14">
          {{ userData.designation }}
        </div>

        <hr class="divider" *ngIf="hasContactInfo()" [style.border-top-color]="designOptions?.primaryColor || '#000'">

        <div class="contact-list" *ngIf="hasContactInfo()">
          <div class="contact-item" *ngIf="userData.phone" [style.font-size.px]="designOptions?.fontSize || 14">
            <i class="fas fa-phone" [style.color]="designOptions?.primaryColor || '#000'"></i>
            <span [style.color]="designOptions?.primaryColor || '#000'">{{ userData.phone }}</span>
          </div>
          <div class="contact-item" *ngIf="userData.email" [style.font-size.px]="designOptions?.fontSize || 14">
            <i class="fas fa-envelope" [style.color]="designOptions?.primaryColor || '#000'"></i>
            <span [style.color]="designOptions?.primaryColor || '#000'">{{ userData.email }}</span>
          </div>
          <div class="contact-item" *ngIf="userData.mobile" [style.font-size.px]="designOptions?.fontSize || 14">
            <i class="fas fa-mobile-alt" [style.color]="designOptions?.primaryColor || '#000'"></i>
            <span [style.color]="designOptions?.primaryColor || '#000'">{{ userData.mobile }}</span>
          </div>
          <div class="contact-item" *ngIf="userData.website" [style.font-size.px]="designOptions?.fontSize || 14">
            <i class="fas fa-globe" [style.color]="designOptions?.primaryColor || '#000'"></i>
            <span [style.color]="designOptions?.primaryColor || '#000'">{{ userData.website }}</span>
          </div>
          <div class="contact-item" *ngIf="userData.address" [style.font-size.px]="designOptions?.fontSize || 14">
            <i class="fas fa-map-marker-alt" [style.color]="designOptions?.primaryColor || '#000'"></i>
            <span [style.color]="designOptions?.primaryColor || '#000'">{{ userData.address }}</span>
          </div>
          
          <!-- Social icons in row format below contacts -->
          <div class="temp2-social-icons" *ngIf="hasSocialLinks()">
            <a *ngIf="userData.linkedin" [href]="userData.linkedin" target="_blank" class="temp2-social-link" 
               [style.background-color]="designOptions?.primaryColor || '#000'">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a *ngIf="userData.twitter" [href]="userData.twitter" target="_blank" class="temp2-social-link"
               [style.background-color]="designOptions?.primaryColor || '#000'">
              <i class="fab fa-twitter"></i>
            </a>
            <a *ngIf="userData.facebook" [href]="userData.facebook" target="_blank" class="temp2-social-link"
               [style.background-color]="designOptions?.primaryColor || '#000'">
              <i class="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .signature-wrapper {
      font-family: Arial, sans-serif;
      display: flex;
      gap: 2rem;
      align-items: flex-start;
      padding: 1.5rem;
      border-radius: 8px;
      max-width: 600px;
      min-height: 250px;
    }

    .signature-left {
      flex: 0 0 150px;
    }

    .profile-img {
      width: 150px;
      height: 210px;
      border-radius: 8px;
      object-fit: cover;
      background-color: #f0f0f0;
      border: 2px solid #000;
      display: block;
    }

    .signature-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 210px;
    }

    .name {
      font-family: 'Brush Script MT', cursive;
      font-size: 28px;
      font-weight: normal;

    }

    .designation {
      font-weight: bold;
      letter-spacing: 1px;
      font-size: 14px;

    }

    .divider {
      border: none;
      border-top: 2px solid #000;
      margin: 10px 0;
      margin-left:-32px;
      opacity: 1;
    }

    .temp2-social-icons {
      display: flex;
      flex-direction: row;
      gap: 10px;
      margin-top: 8px;
    }

    .temp2-social-link {
      width: 24px;
      height: 24px;
      background: #000;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .temp2-social-link:hover {
      transform: scale(1.1);
      opacity: 0.8;
    }

    .contact-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }

    .contact-item i {
      width: 14px;
      text-align: center;
    }
  `]
})
export class Temp2TemplateComponent {
  @Input() userData: any = {};
  @Input() designOptions: any = {};

  getFullName(): string {
    return `${this.userData.firstName || ''} ${this.userData.lastName || ''}`.trim();
  }

  hasContactInfo(): boolean {
    return !!(this.userData.phone || this.userData.email || this.userData.mobile || 
              this.userData.website || this.userData.address || this.hasSocialLinks());
  }

  hasSocialLinks(): boolean {
    return !!(this.userData.linkedin || this.userData.twitter || this.userData.facebook);
  }
}