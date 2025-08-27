package com.signature.repository;

import com.signature.model.Signature;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SignatureRepository extends MongoRepository<Signature, String> {
    List<Signature> findByUserId(String userId);
    List<Signature> findByUserIdOrderByCreatedAtDesc(String userId);
}