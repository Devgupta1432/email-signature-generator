package com.signature.controller;

import com.signature.dto.AuthRequest;
import com.signature.dto.AuthResponse;
import com.signature.dto.RegisterRequest;
import com.signature.service.AuthService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest request) {
        try {
            logger.info("Register request received for email: {}", request.getEmail());
            String message = authService.register(request);
            logger.info("Registration successful for email: {}", request.getEmail());
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            logger.error("Registration failed for email: {} - Error: {}", request.getEmail(), e.getMessage(), e);
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequest request) {
        try {
            logger.info("Login request received for email: {}", request.getEmail());
            AuthResponse response = authService.login(request);
            logger.info("Login successful for email: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Login failed for email: {} - Error: {}", request.getEmail(), e.getMessage(), e);
            return ResponseEntity.badRequest().body("Invalid credentials: " + e.getMessage());
        }
    }

    @GetMapping("/verify-email")
    public String verifyEmail(@RequestParam String token) {
        try {
            logger.info("Email verification request received for token: {}", token);
            authService.verifyEmail(token);
            logger.info("Email verification successful for token: {}", token);
            return "<html><body><h2>Email Verified Successfully!</h2><p>Your email has been verified. You can now <a href='http://localhost:4200/login'>login to your account</a>.</p></body></html>";
        } catch (RuntimeException e) {
            logger.error("Email verification failed for token: {} - Error: {}", token, e.getMessage(), e);
            return "<html><body><h2>Verification Failed</h2><p>" + e.getMessage() + "</p><p><a href='http://localhost:4200/register'>Try registering again</a></p></body></html>";
        }
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<?> oauth2Success(OAuth2AuthenticationToken authentication) {
        try {
            OAuth2User oauth2User = authentication.getPrincipal();
            String email = oauth2User.getAttribute("email");
            String firstName = oauth2User.getAttribute("given_name");
            String lastName = oauth2User.getAttribute("family_name");
            
            logger.info("OAuth2 login request for email: {}", email);
            AuthResponse response = authService.googleLogin(email, firstName, lastName);
            logger.info("OAuth2 login successful for email: {}", email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("OAuth2 login failed - Error: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("OAuth2 login failed: " + e.getMessage());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String token) {
        try {
            logger.debug("Profile request received");
            String jwt = token.replace("Bearer ", "");
            AuthResponse response = authService.getUserProfile(jwt);
            logger.debug("Profile request successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Profile request failed - Error: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body("Invalid token");
        }
    }
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        logger.info("Test endpoint called");
        return ResponseEntity.ok("Auth controller is working!");
    }
    
    @PostMapping("/test-login")
    public ResponseEntity<String> testLogin() {
        logger.info("Test login endpoint called");
        return ResponseEntity.ok("Test login endpoint working!");
    }
    
    @GetMapping("/check-user/{email}")
    public ResponseEntity<?> checkUser(@PathVariable String email) {
        try {
            logger.info("Checking user: {}", email);
            return ResponseEntity.ok(authService.checkUserExists(email));
        } catch (Exception e) {
            logger.error("Error checking user: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}