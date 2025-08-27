import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBlockComponent } from './text-block.component';
import { SocialIconsComponent } from './social-icons.component';
import { AvatarComponent } from './avatar.component';
import { AvatarWithTextComponent } from './avatar-with-text.component';

export interface TemplateConfig {
  id: string;
  name: string;
  category: string;
  layout: 'horizontal' | 'vertical' | 'grid' | 'card';
  components: ComponentConfig[];
  containerStyles: any;
}

export interface ComponentConfig {
  type: 'avatar' | 'text' | 'social' | 'divider' | 'avatar-with-text';
  position: any;
  props: any;
  styles: any;
}

@Component({
  selector: 'dynamic-template',
  standalone: true,
  imports: [CommonModule, TextBlockComponent, SocialIconsComponent, AvatarComponent, AvatarWithTextComponent],
  template: `
    <div class="template-container" [ngStyle]="getContainerStyles()">
      <div *ngFor="let component of templateConfig.components" 
           [ngStyle]="component.position"
           class="component-wrapper">
        
        <!-- Avatar Component -->
        <sig-avatar *ngIf="component.type === 'avatar'"
                   [src]="userData.logo"
                   [shape]="component.props.shape"
                   [size]="component.props.size"
                   [border]="component.props.border"
                   [customStyles]="component.styles">
        </sig-avatar>
        
        <!-- Avatar with Text Component -->
        <sig-avatar-with-text *ngIf="component.type === 'avatar-with-text'"
                             [src]="userData.logo"
                             [shape]="component.props.shape"
                             [size]="component.props.size"
                             [border]="component.props.border"
                             [userData]="userData"
                             [containerStyles]="component.styles"
                             [nameStyles]="component.props.nameStyles"
                             [titleStyles]="component.props.titleStyles">
        </sig-avatar-with-text>
        
        <!-- Text Component -->
        <sig-text-block *ngIf="component.type === 'text'"
                       [fields]="component.props.fields"
                       [userData]="userData"
                       [fieldStyles]="getFieldStyles(component)"
                       [containerStyles]="getComponentStyles(component)"
                       [templateId]="templateConfig.id"
                       [primaryColor]="designOptions.primaryColor">
        </sig-text-block>
        
        <!-- Social Component -->
        <sig-social-icons *ngIf="component.type === 'social'"
                         [userData]="userData"
                         [style]="component.props.style"
                         [size]="component.props.size"
                         [containerStyles]="component.styles">
        </sig-social-icons>
        
        <!-- Divider Component -->
        <div *ngIf="component.type === 'divider'" 
             class="divider"
             [ngStyle]="component.styles">
        </div>
        
      </div>
    </div>
  `,
  styles: [`
    .template-container {
      font-family: Arial, sans-serif;
      max-width: 600px;
    }
    .component-wrapper {
      position: relative;
    }
    .divider {
      width: 1px;
      background: #000;
      height: 100%;
    }
  `]
})
export class DynamicTemplateComponent {
  @Input() templateConfig!: TemplateConfig;
  @Input() userData: any = {};
  @Input() designOptions: any = {};

  getContainerStyles() {
    return {
      ...this.templateConfig.containerStyles,
      fontFamily: this.designOptions.fontFamily || this.templateConfig.containerStyles.fontFamily,
      fontSize: this.designOptions.fontSize ? `${this.designOptions.fontSize}px` : this.templateConfig.containerStyles.fontSize,
      color: this.designOptions.primaryColor || '#000000',
      overflow: 'hidden',
      wordWrap: 'break-word'
    };
  }

  getComponentStyles(component: ComponentConfig) {
    const baseStyles = component.styles || {};
    
    if (component.type === 'text') {
      return {
        ...baseStyles,
        color: this.designOptions.primaryColor || baseStyles.color
      };
    }
    
    return baseStyles;
  }

  getFieldStyles(component: ComponentConfig) {
    if (component.type !== 'text') return component.props.fieldStyles || {};
    
    const fieldStyles = component.props.fieldStyles || {};
    const updatedStyles: any = {};
    
    Object.keys(fieldStyles).forEach(field => {
      const baseFontSize = this.designOptions.fontSize || 14;
      
      updatedStyles[field] = {
        ...fieldStyles[field],
        color: this.designOptions.primaryColor || fieldStyles[field]?.color || '#000000',
        fontFamily: this.designOptions.fontFamily || fieldStyles[field]?.fontFamily
      };
      
      // Apply relative font sizes with proper scaling
      if (field === 'company') {
        updatedStyles[field] = {
          ...updatedStyles[field],
          fontSize: `${Math.min(baseFontSize + 4, 22)}px`,
          fontWeight: 'bold',
          letterSpacing: '2px',
          marginBottom: '10px',
          lineHeight: '1.2'
        };
      } else {
        updatedStyles[field] = {
          ...updatedStyles[field],
          fontSize: `${Math.min(baseFontSize, 16)}px`,
          lineHeight: '1.4'
        };
      }
    });
    
    return updatedStyles;
  }
}