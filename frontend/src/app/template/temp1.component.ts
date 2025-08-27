import { Component } from '@angular/core';

@Component({
  selector: 'app-temp1',
  template: `
    <div class="signature-container">
      <div class="signature-preview">
        <img src="assets/1.svg" alt="Custom Signature Template" class="svg-signature">
      </div>
    </div>
  `,
  styles: [`
    .signature-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .signature-preview {
      background: white;
      border-radius: 16px;

      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;

    }

    .svg-signature {
      max-width: 100%;
      height: auto;
          min-width: 600px;
    min-height: 400px;
      display: block;
    }

    @media (max-width: 768px) {
      .signature-container {
        padding: 1rem;
      }
      
      .signature-preview {
        padding: 1rem;
      }
    }
  `]
})
export class Temp1Component { }