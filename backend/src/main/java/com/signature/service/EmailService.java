package com.signature.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Value("${app.frontend-url}")
    private String frontendUrl;
    
    @Value("${app.backend-url:https://email-signature-generator-back.onrender.com}")
    private String backendUrl;

    public void sendVerificationEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Email Verification - Signature Generator");
        message.setText("Please click the following link to verify your email: " + 
                       backendUrl + "/auth/verify-email?token=" + token);
        mailSender.send(message);
    }
}