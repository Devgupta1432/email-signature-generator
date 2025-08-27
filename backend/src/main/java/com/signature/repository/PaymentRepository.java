package com.signature.repository;

import com.signature.model.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends MongoRepository<Payment, String> {
    List<Payment> findByUserId(String userId);
    Optional<Payment> findByStripeSessionId(String sessionId);
    List<Payment> findByStatus(Payment.PaymentStatus status);
}