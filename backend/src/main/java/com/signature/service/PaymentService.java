package com.signature.service;

import com.signature.model.Payment;
import com.signature.model.User;
import com.signature.repository.PaymentRepository;
import com.signature.repository.UserRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Value("${stripe.api-key}")
    private String stripeApiKey;
    
    @Value("${app.frontend-url}")
    private String frontendUrl;

    public String createCheckoutSession(String userId, String planType) throws StripeException {
        Stripe.apiKey = stripeApiKey;
        
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        long amount = planType.equals("MONTHLY") ? 999 : 2999; // $9.99 or $29.99
        
        SessionCreateParams params = SessionCreateParams.builder()
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl(frontendUrl + "/payment-success?session_id={CHECKOUT_SESSION_ID}")
            .setCancelUrl(frontendUrl + "/payment-cancel")
            .addLineItem(
                SessionCreateParams.LineItem.builder()
                    .setQuantity(1L)
                    .setPriceData(
                        SessionCreateParams.LineItem.PriceData.builder()
                            .setCurrency("usd")
                            .setUnitAmount(amount)
                            .setProductData(
                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                    .setName("PRO Access - " + planType)
                                    .build()
                            )
                            .build()
                    )
                    .build()
            )
            .putMetadata("userId", userId)
            .putMetadata("planType", planType)
            .build();

        Session session = Session.create(params);
        
        // Save payment record
        Payment payment = new Payment();
        payment.setUserId(user.getId());
        payment.setStripeSessionId(session.getId());
        payment.setAmount(BigDecimal.valueOf(amount / 100.0));
        payment.setPlanType(Payment.PlanType.valueOf(planType));
        paymentRepository.save(payment);
        
        return session.getUrl();
    }

    public void handleSuccessfulPayment(String sessionId) {
        Payment payment = paymentRepository.findByStripeSessionId(sessionId)
            .orElseThrow(() -> new RuntimeException("Payment not found"));
        
        payment.setStatus(Payment.PaymentStatus.COMPLETED);
        paymentRepository.save(payment);
        
        // Upgrade user to PRO
        User user = userRepository.findById(payment.getUserId())
            .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPro(true);
        userRepository.save(user);
    }
}