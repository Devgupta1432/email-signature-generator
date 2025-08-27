# Email Signature Generator

A full-stack web application for creating and managing professional email signatures with PRO templates and Stripe payment integration.

## Features

### 🔐 Authentication
- User registration with comprehensive profile fields
- Email verification via token
- Google OAuth2 integration
- JWT-based session management

### ✍️ Signature Generation
- Create and customize email signatures
- Live preview during editing
- Image/logo upload support
- Personal details and social profiles integration
- Static and animated template selection

### 🎨 Template Management
- Admin template upload and management
- PRO/FREE template categorization
- Template preview and selection

### 💳 Payment Integration
- Stripe checkout for PRO access
- Monthly ($9.99) and one-time ($29.99) pricing plans
- Automatic PRO feature unlock

### 👤 User Management
- User dashboard with signature management
- Admin dashboard for user and template management
- PRO status tracking

## Tech Stack

### Backend
- **Framework**: Spring Boot 3
- **Security**: Spring Security with JWT + OAuth2
- **Database**: MySQL
- **Payment**: Stripe API
- **Email**: SMTP (Gmail)

### Frontend
- **Framework**: Angular 16+
- **Styling**: Bootstrap 5
- **Payment**: Stripe.js
- **Architecture**: Responsive SPA

## Project Structure

```
├── backend/                 # Spring Boot backend
│   ├── src/main/java/com/signature/
│   │   ├── config/         # Security and app configuration
│   │   ├── controller/     # REST API controllers
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── model/         # JPA entities
│   │   ├── repository/    # Data repositories
│   │   ├── security/      # JWT and security components
│   │   └── service/       # Business logic services
│   └── src/main/resources/
│       └── application.yml # Application configuration
│
└── frontend/               # Angular frontend
    ├── src/app/
    │   ├── components/     # Angular components
    │   ├── services/       # HTTP services
    │   ├── models/         # TypeScript interfaces
    │   ├── guards/         # Route guards
    │   └── interceptors/   # HTTP interceptors
    └── src/environments/   # Environment configurations
```

## Getting Started

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

### Backend Setup
1. Navigate to backend directory
2. Configure MySQL database in `application.yml`
3. Update OAuth2 and Stripe credentials
4. Run: `mvn spring-boot:run`

### Frontend Setup
1. Navigate to frontend directory
2. Install dependencies: `npm install`
3. Update API URL in `environment.ts`
4. Run: `ng serve`

### Database Setup
Create MySQL database:
```sql
CREATE DATABASE signature_db;
```

The application will auto-create tables on first run.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify-email` - Email verification
- `GET /api/auth/oauth2/success` - OAuth2 callback

### Templates
- `GET /api/templates/public` - Get free templates
- `GET /api/templates` - Get all templates (authenticated)
- `POST /api/templates` - Create template (admin)

### Signatures
- `GET /api/signatures` - Get user signatures
- `POST /api/signatures` - Create signature
- `PUT /api/signatures/{id}` - Update signature
- `DELETE /api/signatures/{id}` - Delete signature

### Payment
- `POST /api/payment/create-checkout-session` - Create Stripe session
- `POST /api/payment/success` - Handle payment success

## Configuration

### Backend Configuration (application.yml)
- Database connection settings
- JWT secret and expiration
- OAuth2 client credentials
- Stripe API keys
- SMTP email settings

### Frontend Configuration (environment.ts)
- API base URL
- Stripe publishable key

## Security Features
- JWT token authentication
- Password encryption with BCrypt
- CORS configuration
- Role-based access control
- OAuth2 integration

## Payment Integration
- Stripe Checkout for secure payments
- Automatic PRO upgrade on successful payment
- Payment history tracking
- Webhook support for payment events

## Development Notes
- Backend runs on port 8080
- Frontend runs on port 4200
- MySQL database required
- Email verification requires SMTP configuration
- Stripe test keys provided for development