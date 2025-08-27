# Email Signature Generator - Frontend

Angular 16+ frontend application for the Email Signature Generator with responsive design and Stripe integration.

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Update `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8080/api',
     stripePublishableKey: 'pk_test_your_stripe_publishable_key'
   };
   ```

3. **Run Application**
   ```bash
   ng serve
   ```

4. **Access Application**
   - URL: `http://localhost:4200`

## Features

### Authentication
- User registration with form validation
- Login with email/password
- Google OAuth2 integration
- JWT token management
- Email verification flow

### Dashboard
- User profile display
- PRO status indicator
- Upgrade to PRO options
- Navigation to main features

### Signature Management
- Template browsing and selection
- Signature creation and editing
- Live preview functionality
- Save and manage signatures

### Payment Integration
- Stripe Checkout integration
- Monthly and one-time payment plans
- Automatic PRO upgrade

## Components

### Core Components
- `LoginComponent` - User authentication
- `RegisterComponent` - User registration
- `DashboardComponent` - Main user dashboard

### Services
- `AuthService` - Authentication management
- `PaymentService` - Stripe payment handling
- `TemplateService` - Template operations
- `SignatureService` - Signature CRUD operations

### Guards
- `AuthGuard` - Route protection for authenticated users
- `ProGuard` - Route protection for PRO features

### Interceptors
- `AuthInterceptor` - Automatic JWT token injection

## Styling

### Bootstrap 5
- Responsive grid system
- Form components
- Navigation and buttons
- Alert and card components

### Custom CSS
- Signature preview styling
- Template card hover effects
- PRO badge styling
- Custom color scheme

## Routing

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'templates', component: TemplatesComponent, canActivate: [AuthGuard] },
  { path: 'signatures', component: SignaturesComponent, canActivate: [AuthGuard] },
  { path: 'editor/:id', component: EditorComponent, canActivate: [AuthGuard] }
];
```

## State Management

### Local Storage
- JWT token storage
- User session persistence

### Services
- Reactive state management with RxJS
- BehaviorSubject for user state
- Observable patterns for data flow

## Development

### Prerequisites
- Node.js 16+
- Angular CLI 16+
- npm or yarn

### Build Commands
- `ng serve` - Development server
- `ng build` - Production build
- `ng test` - Unit tests
- `ng lint` - Code linting

### Environment Configuration
- Development: `environment.ts`
- Production: `environment.prod.ts`

## Deployment

### Build for Production
```bash
ng build --prod
```

### Deploy to Web Server
Upload `dist/` folder contents to web server root directory.

### Environment Variables
Update production environment file with:
- Production API URL
- Production Stripe publishable key