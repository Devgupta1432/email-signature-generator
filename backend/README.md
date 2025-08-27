# Email Signature Generator - Backend

Spring Boot backend application for the Email Signature Generator with JWT authentication, OAuth2, and Stripe integration.

## Quick Start

1. **Database Setup**
   ```sql
   CREATE DATABASE signature_db;
   ```

2. **Run Application**
   ```bash
   mvn spring-boot:run
   ```

3. **Access API**
   - Base URL: `http://localhost:8080/api`
   - Swagger UI: `http://localhost:8080/swagger-ui.html` (if configured)

## Configuration

Update `src/main/resources/application.yml` with your credentials:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/signature_db
    username: your_username
    password: your_password
  
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: your_google_client_id
            client-secret: your_google_client_secret
  
  mail:
    username: your_email@gmail.com
    password: your_app_password

jwt:
  secret: your_jwt_secret_key

stripe:
  api-key: your_stripe_secret_key
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify-email?token={token}` - Verify email

### Template Endpoints
- `GET /api/templates/public` - Get free templates
- `GET /api/templates` - Get all templates (auth required)
- `POST /api/templates` - Create template (admin only)

### Signature Endpoints
- `GET /api/signatures` - Get user signatures
- `POST /api/signatures` - Create new signature
- `PUT /api/signatures/{id}` - Update signature

### Payment Endpoints
- `POST /api/payment/create-checkout-session` - Create Stripe session
- `POST /api/payment/success` - Handle payment success

## Database Schema

### Users Table
- id, firstName, lastName, email, password
- company, mobile, officeNumber, designation
- role, isVerified, isPro, verificationToken

### Templates Table
- id, name, category, isPro, content, previewImage
- uploadedBy, createdAt

### Signatures Table
- id, userId, templateId, contentJson, signatureName
- createdAt, updatedAt

### Payments Table
- id, userId, stripeSessionId, amount, planType
- status, createdAt

## Security Features
- JWT token authentication
- OAuth2 Google integration
- Role-based access control
- Password encryption with BCrypt
- CORS configuration for frontend

## Development
- Java 17+
- Spring Boot 3.2.0
- MySQL 8.0+
- Maven build system