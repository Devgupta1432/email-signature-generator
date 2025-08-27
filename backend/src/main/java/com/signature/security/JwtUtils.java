package com.signature.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {
    
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);
    
    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpirationMs;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateJwtToken(Authentication authentication) {
        try {
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            logger.debug("Generating JWT token for user: {}", userPrincipal.getEmail());
            
            String token = Jwts.builder()
                    .setSubject(userPrincipal.getEmail())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                    .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                    .compact();
            
            logger.debug("JWT token generated successfully for user: {}", userPrincipal.getEmail());
            return token;
        } catch (Exception e) {
            logger.error("Failed to generate JWT token - Error: {}", e.getMessage(), e);
            throw new RuntimeException("JWT token generation failed", e);
        }
    }

    public String generateTokenFromEmail(String email) {
        try {
            logger.debug("Generating JWT token from email: {}", email);
            
            String token = Jwts.builder()
                    .setSubject(email)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                    .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                    .compact();
            
            logger.debug("JWT token generated successfully from email: {}", email);
            return token;
        } catch (Exception e) {
            logger.error("Failed to generate JWT token from email: {} - Error: {}", email, e.getMessage(), e);
            throw new RuntimeException("JWT token generation failed", e);
        }
    }

    public String getEmailFromJwtToken(String token) {
        try {
            logger.debug("Extracting email from JWT token");
            
            String email = Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            
            logger.debug("Email extracted successfully from JWT token: {}", email);
            return email;
        } catch (Exception e) {
            logger.error("Failed to extract email from JWT token - Error: {}", e.getMessage(), e);
            throw new RuntimeException("JWT token parsing failed", e);
        }
    }

    public boolean validateJwtToken(String authToken) {
        try {
            logger.debug("Validating JWT token");
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(authToken);
            logger.debug("JWT token validation successful");
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token - Malformed: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        } catch (JwtException e) {
            logger.error("JWT token validation failed: {}", e.getMessage());
        }
        return false;
    }
}