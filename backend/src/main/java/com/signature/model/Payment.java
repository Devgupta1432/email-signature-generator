package com.signature.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "payments")
public class Payment {
    @Id
    private String id;

    @Field("user_id")
    private String userId;

    @Field("stripe_session_id")
    private String stripeSessionId;

    @Field("stripe_payment_intent_id")
    private String stripePaymentIntentId;

    private BigDecimal amount;

    @Field("plan_type")
    private PlanType planType;

    private PaymentStatus status = PaymentStatus.PENDING;

    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public enum PlanType {
        MONTHLY, ONE_TIME
    }

    public enum PaymentStatus {
        PENDING, COMPLETED, FAILED, CANCELLED
    }

    // Constructors
    public Payment() {}

    public Payment(String userId, String stripeSessionId, BigDecimal amount, PlanType planType) {
        this.userId = userId;
        this.stripeSessionId = stripeSessionId;
        this.amount = amount;
        this.planType = planType;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getStripeSessionId() { return stripeSessionId; }
    public void setStripeSessionId(String stripeSessionId) { this.stripeSessionId = stripeSessionId; }

    public String getStripePaymentIntentId() { return stripePaymentIntentId; }
    public void setStripePaymentIntentId(String stripePaymentIntentId) { this.stripePaymentIntentId = stripePaymentIntentId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public PlanType getPlanType() { return planType; }
    public void setPlanType(PlanType planType) { this.planType = planType; }

    public PaymentStatus getStatus() { return status; }
    public void setStatus(PaymentStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}