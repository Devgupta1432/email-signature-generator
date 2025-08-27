import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sig-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="avatar-container" [ngStyle]="containerStyles">
      <img [src]="src || defaultImage" 
           [alt]="alt"
           [ngStyle]="imageStyles"
           class="avatar-image">
    </div>
  `,
  styles: [`
    .avatar-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar-image {
      object-fit: cover;
      display: block;
    }
  `]
})
export class AvatarComponent {
  @Input() src: string = '';
  @Input() alt: string = 'Profile Image';
  @Input() shape: 'circle' | 'square' | 'rounded' | 'rectangle' = 'circle';
  @Input() size: string = '80px';
  @Input() height: string = '';
  @Input() border: string = 'none';
  @Input() customStyles: any = {};

  defaultImage = 'https://via.placeholder.com/120';

  get containerStyles() {
    return {
      width: this.size,
      height: this.height || this.size,
      ...this.customStyles.container
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
      case 'rectangle':
        return { ...baseStyles, borderRadius: '8px' };
      default:
        return baseStyles;
    }
  }
}