package com.signature.controller;

import com.signature.security.UserPrincipal;
import com.signature.service.PaymentService;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*", maxAge = 3600)
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<?> createCheckoutSession(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody Map<String, String> request) {
        try {
            String planType = request.get("planType");
            String checkoutUrl = paymentService.createCheckoutSession(userPrincipal.getId(), planType);
            return ResponseEntity.ok(Map.of("url", checkoutUrl));
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body("Payment processing error: " + e.getMessage());
        }
    }

    @PostMapping("/success")
    public ResponseEntity<?> paymentSuccess(@RequestParam String sessionId) {
        try {
            paymentService.handleSuccessfulPayment(sessionId);
            return ResponseEntity.ok("Payment successful! PRO features unlocked.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}