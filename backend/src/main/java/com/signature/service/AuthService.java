package com.signature.service;

import com.signature.dto.AuthRequest;
import com.signature.dto.AuthResponse;
import com.signature.dto.RegisterRequest;
import com.signature.model.User;
import com.signature.repository.UserRepository;
import com.signature.security.JwtUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.UUID;

@Service
public class AuthService {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    @Autowired
    private EmailService emailService;

    public String register(RegisterRequest request) {
        logger.info("Registration attempt for email: {}", request.getEmail());
        
        if (userRepository.existsByEmail(request.getEmail())) {
            logger.warn("Registration failed - email already exists: {}", request.getEmail());
            throw new RuntimeException("Email is already taken!");
        }

        try {
            User user = new User();
            user.setFirstName(request.getFirstName());
            user.setLastName(request.getLastName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setCompany(request.getCompany());
            user.setMobile(request.getMobile());
            user.setOfficeNumber(request.getOfficeNumber());
            user.setDesignation(request.getDesignation());
            user.setVerificationToken(UUID.randomUUID().toString());

            userRepository.save(user);
            logger.info("User saved to database: {}", request.getEmail());
            
            emailService.sendVerificationEmail(user.getEmail(), user.getVerificationToken());
            logger.info("Verification email sent to: {}", request.getEmail());
            
            return "User registered successfully. Please check your email for verification.";
        } catch (Exception e) {
            logger.error("Registration failed for email: {} - Error: {}", request.getEmail(), e.getMessage(), e);
            throw new RuntimeException("Registration failed: " + e.getMessage());
        }
    }

    public AuthResponse login(AuthRequest request) {
        logger.info("Login attempt for email: {}", request.getEmail());
        
        try {
            // Check if user exists
            User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    logger.warn("Login failed - user not found: {}", request.getEmail());
                    return new RuntimeException("User not found");
                });
            
            logger.debug("User found: {}, verified: {}, role: {}", request.getEmail(), user.isVerified(), user.getRole());
            
            // Check if email is verified
            if (!user.isVerified()) {
                logger.warn("Login failed - email not verified: {}", request.getEmail());
                throw new RuntimeException("Please verify your email before logging in");
            }
            
            // Authenticate user
            logger.debug("Attempting authentication for: {}", request.getEmail());
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            logger.debug("Authentication successful for: {}", request.getEmail());

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);
            logger.debug("JWT token generated for: {}", request.getEmail());

            logger.info("Login successful for email: {}", request.getEmail());
            return new AuthResponse(jwt, user.getId(), user.getEmail(), 
                user.getFirstName(), user.getLastName(), user.isPro(), user.getRole().name());
                
        } catch (BadCredentialsException e) {
            logger.error("Login failed - invalid credentials for email: {}", request.getEmail());
            throw new RuntimeException("Invalid email or password");
        } catch (AuthenticationException e) {
            logger.error("Login failed - authentication error for email: {} - Error: {}", request.getEmail(), e.getMessage(), e);
            throw new RuntimeException("Authentication failed: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Login failed for email: {} - Unexpected error: {}", request.getEmail(), e.getMessage(), e);
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }

    public String verifyEmail(String token) {
        logger.info("Email verification attempt for token: {}", token);
        
        try {
            User user = userRepository.findByVerificationToken(token)
                .orElseThrow(() -> {
                    logger.warn("Email verification failed - invalid token: {}", token);
                    return new RuntimeException("Invalid verification token");
                });
            
            logger.info("Verifying email for user: {}", user.getEmail());
            user.setVerified(true);
            user.setVerificationToken(null);
            userRepository.save(user);
            
            logger.info("Email verification successful for user: {}", user.getEmail());
            return "Email verified successfully";
        } catch (Exception e) {
            logger.error("Email verification failed for token: {} - Error: {}", token, e.getMessage(), e);
            throw e;
        }
    }

    public AuthResponse googleLogin(String email, String firstName, String lastName) {
        logger.info("Google OAuth login attempt for email: {}", email);
        
        try {
            User user = userRepository.findByEmail(email).orElse(null);
            
            if (user == null) {
                logger.info("Creating new user from Google OAuth: {}", email);
                user = new User();
                user.setEmail(email);
                user.setFirstName(firstName);
                user.setLastName(lastName);
                user.setVerified(true);
                user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                userRepository.save(user);
                logger.info("New Google OAuth user created: {}", email);
            } else {
                logger.info("Existing user found for Google OAuth: {}", email);
            }

            String jwt = jwtUtils.generateTokenFromEmail(email);
            logger.info("Google OAuth login successful for email: {}", email);
            
            return new AuthResponse(jwt, user.getId(), user.getEmail(), 
                user.getFirstName(), user.getLastName(), user.isPro(), user.getRole().name());
        } catch (Exception e) {
            logger.error("Google OAuth login failed for email: {} - Error: {}", email, e.getMessage(), e);
            throw new RuntimeException("Google login failed: " + e.getMessage());
        }
    }

    public AuthResponse getUserProfile(String jwt) {
        try {
            logger.debug("Getting user profile from JWT");
            String email = jwtUtils.getEmailFromJwtToken(jwt);
            logger.debug("Email extracted from JWT: {}", email);
            
            User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    logger.warn("User profile request failed - user not found: {}", email);
                    return new RuntimeException("User not found");
                });
            
            logger.debug("User profile retrieved successfully for: {}", email);
            return new AuthResponse(jwt, user.getId(), user.getEmail(), 
                user.getFirstName(), user.getLastName(), user.isPro(), user.getRole().name());
        } catch (Exception e) {
            logger.error("Get user profile failed - Error: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to get user profile: " + e.getMessage());
        }
    }
    
    public String checkUserExists(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return "User does not exist: " + email;
        }
        return String.format("User exists: %s, Verified: %s, Role: %s", 
            email, user.isVerified(), user.getRole());
    }
}