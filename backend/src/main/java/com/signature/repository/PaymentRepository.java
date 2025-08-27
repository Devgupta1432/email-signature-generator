package com.signature.repository;

import com.signature.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserId(Long userId);
    Optional<Payment> findByStripeSessionId(String sessionId);
    List<Payment> findByStatus(Payment.PaymentStatus status);
}