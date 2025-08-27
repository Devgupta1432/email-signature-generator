import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sig-avatar-with-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="avatar-text-container" [ngStyle]="containerStyles">
      <div class="avatar-wrapper" [ngStyle]="avatarWrapperStyles">
        <img [src]="src || defaultImage" 
             [alt]="alt"
             [ngStyle]="imageStyles"
             class="avatar-image">
      </div>
      <div class="text-below-avatar" style="text-align: center; width: 100%;">
        <div class="name-field" [ngStyle]="nameStyles" style="text-align: center;">
          {{ getFullName() }}
        </div>
        <div class="title-field" [ngStyle]="titleStyles" style="text-align: center;">
          {{ userData.designation || 'Your Title' }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .avatar-text-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .avatar-wrapper {
      margin-bottom: 15px;
    }
    .avatar-image {
      object-fit: cover;
      display: block;
    }
    .text-below-avatar {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  `]
})
export class AvatarWithTextComponent {
  @Input() src: string = '';
  @Input() alt: string = 'Profile Image';
  @Input() shape: 'circle' | 'square' | 'rounded' = 'circle';
  @Input() size: string = '140px';
  @Input() border: string = 'none';
  @Input() userData: any = {};
  @Input() containerStyles: any = {};
  @Input() nameStyles: any = {};
  @Input() titleStyles: any = {};

  defaultImage = 'https://via.placeholder.com/120';

  get avatarWrapperStyles() {
    return {
      width: this.size,
      height: this.size
    };
  }

  get imageStyles() {
    const baseStyles = {
      width: '100%',
      height: '100%',
      border: this.border
    };

    switch (this.shape) {
      case 'circle':
        return { ...baseStyles, borderRadius: '50%' };
      case 'rounded':
        return { ...baseStyles, borderRadius: '8px' };
      default:
        return baseStyles;
    }
  }

  getFullName(): string {
    return `${this.userData.firstName || ''} ${this.userData.lastName || ''}`.trim() || 'Your Name';
  }
}