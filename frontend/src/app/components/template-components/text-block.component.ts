import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialIconsComponent } from './social-icons.component';

@Component({
  selector: 'sig-text-block',
  standalone: true,
  imports: [CommonModule, SocialIconsComponent],
  template: `
    <div class="text-block" [ngStyle]="containerStyles">
      <ng-container *ngFor="let field of fields">
        <div *ngIf="hasFieldValue(field)"
             [ngStyle]="getFieldStyles(field)"
             class="text-field">
          {{ getFieldValue(field) }}
        </div>
      </ng-container>
      <sig-social-icons *ngIf="templateId === 'temp1' && showSocialAfterEmail" 
                       [userData]="userData"
                       [size]="'medium'"
                       [primaryColor]="primaryColor"
                       [containerStyles]="{gap: '12px', 'margin-top': '10px'}">
      </sig-social-icons>
    </div>
  `,
  styles: [`
    .text-block {
      display: flex;
      flex-direction: column;
    }
    .text-field {
      margin-bottom: 0.25rem;
    }
  `]
})
export class TextBlockComponent {
  @Input() fields: string[] = [];
  @Input() userData: any = {};
  @Input() fieldStyles: any = {};
  @Input() containerStyles: any = {};
  @Input() layout: 'vertical' | 'horizontal' = 'vertical';
  @Input() templateId: string = '';
  @Input() primaryColor: string = '';

  get showSocialAfterEmail(): boolean {
    return this.fields.includes('email') && (this.userData.linkedin || this.userData.twitter || this.userData.facebook);
  }

  hasFieldValue(field: string): boolean {
    switch (field) {
      case 'name':
        return !!(this.userData.firstName || this.userData.lastName);
      case 'title':
        return !!this.userData.designation;
      case 'company':
        return !!this.userData.company;
      case 'email':
        return !!this.userData.email;
      case 'phone':
        return !!this.userData.phone;
      case 'mobile':
        return !!this.userData.mobile;
      case 'website':
        return !!this.userData.website;
      case 'address':
        return !!this.userData.address;
      default:
        return false;
    }
  }

  getFieldValue(field: string): string {
    switch (field) {
      case 'name':
        return `${this.userData.firstName || ''} ${this.userData.lastName || ''}`.trim();
      case 'title':
        return this.userData.designation;
      case 'company':
        return this.userData.company;
      case 'email':
        return `📧 ${this.userData.email}`;
      case 'phone':
        return `📞 ${this.userData.phone}`;
      case 'mobile':
        return `📱 ${this.userData.mobile}`;
      case 'website':
        return `🌐 ${this.userData.website}`;
      case 'address':
        return this.userData.address;
      default:
        return '';
    }
  }

  getFieldStyles(field: string): any {
    return this.fieldStyles[field] || {};
  }
}