import { Injectable } from '@angular/core';
import { TemplateConfig } from '../components/template-components/dynamic-template.component';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  
  private templates: TemplateConfig[] = [
    // Template 1 - Your existing temp1 converted to JSON
    {
      id: 'temp1',
      name: 'Professional Split',
      category: 'corporate',
      layout: 'horizontal',
      containerStyles: {
        display: 'flex',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        padding: '1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        maxWidth: '600px',
        fontFamily: 'Arial, sans-serif'
      },
      components: [
        {
          type: 'avatar-with-text',
          position: {
            flex: '0 0 200px',
            textAlign: 'center',
            paddingRight: '20px',
            borderRight: '1px solid #000'
          },
          props: {
            shape: 'circle',
            size: '140px',
            border: '2px solid black',
            nameStyles: {
              fontSize: '18px',
              fontWeight: 'normal',
              color: '#000',
              marginBottom: '5px'
            },
            titleStyles: {
              fontSize: '12px',
              letterSpacing: '2px',
              color: '#000'
            }
          },
          styles: {}
        },
        {
          type: 'text',
          position: {
            flex: '1',
            paddingLeft: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          },
          props: {
            fields: ['company', 'phone', 'website', 'email'],
            fieldStyles: {
              company: {
                fontSize: '20px',
                fontWeight: 'bold',
                letterSpacing: '4px',
                color: '#000',
                marginBottom: '20px'
              },
              phone: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                color: '#000',
                fontSize: '14px'
              },
              website: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                color: '#000',
                fontSize: '14px'
              },
              email: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                color: '#000',
                fontSize: '14px'
              }
            }
          },
          styles: {}
        }
      ]
    },
    
    // Template 2 - Creative Designer (from signature creator)
    {
      id: 'temp2',
      name: 'Creative Designer',
      category: 'creative',
      layout: 'horizontal',
      containerStyles: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '2rem',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f6f4',
        padding: '1.5rem',
        borderRadius: '8px',
        maxWidth: '600px'
      },
      components: [
        {
          type: 'avatar',
          position: {
            flex: '0 0 150px'
          },
          props: {
            shape: 'rectangle',
            size: '150px',
            height: '210px',
            border: 'none'
          },
          styles: {
            borderRadius: '8px'
          }
        },
        {
          type: 'text',
          position: {
            flex: '1',
            paddingLeft: '1rem'
          },
          props: {
            fields: ['firstName', 'lastName', 'designation'],
            fieldStyles: {
              firstName: {
                fontFamily: 'Brush Script MT, cursive',
                fontSize: '28px',
                fontWeight: 'normal',
                color: '#000',
                display: 'inline',
                marginRight: '8px'
              },
              lastName: {
                fontFamily: 'Brush Script MT, cursive',
                fontSize: '28px',
                fontWeight: 'normal',
                color: '#000',
                display: 'inline'
              },
              designation: {
                fontWeight: 'bold',
                letterSpacing: '1px',
                fontSize: '14px',
                color: '#000',
                marginTop: '5px',
                marginBottom: '15px'
              }
            }
          },
          styles: {}
        },
        {
          type: 'divider',
          position: {
            width: '100%',
            margin: '10px 0'
          },
          props: {},
          styles: {
            border: 'none',
            borderTop: '2px solid #000',
            opacity: '1'
          }
        },
        {
          type: 'text',
          position: {
            display: 'flex',
            gap: '15px',
            alignItems: 'flex-start'
          },
          props: {
            fields: ['phone', 'email', 'website'],
            fieldStyles: {
              phone: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                color: '#000',
                fontSize: '14px'
              },
              email: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                color: '#000',
                fontSize: '14px'
              },
              website: {
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                color: '#000',
                fontSize: '14px'
              }
            }
          },
          styles: {
            flexDirection: 'column'
          }
        },
        {
          type: 'social',
          position: {
            position: 'absolute',
            left: '170px',
            top: '120px'
          },
          props: {
            style: 'vertical',
            size: 'small'
          },
          styles: {
            flexDirection: 'column',
            gap: '13px'
          }
        }
      ]
    }
  ];

  getAllTemplates(): TemplateConfig[] {
    return this.templates;
  }

  getTemplateById(id: string): TemplateConfig | null {
    return this.templates.find(t => t.id === id) || null;
  }

  getAvailableTemplates() {
    return [
      { id: 'temp1', name: 'Professional' },
      { id: 'temp2', name: 'Creative' },
      { id: 'modern', name: 'Modern' },
      { id: 'minimal', name: 'Minimal' }
    ];
  }

  getTemplatesByCategory(category: string): TemplateConfig[] {
    return this.templates.filter(t => t.category === category);
  }

  addTemplate(template: TemplateConfig): void {
    this.templates.push(template);
  }
}