package com.signature.repository;

import com.signature.model.Signature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SignatureRepository extends JpaRepository<Signature, Long> {
    List<Signature> findByUserId(Long userId);
    List<Signature> findByUserIdOrderByCreatedAtDesc(Long userId);
}