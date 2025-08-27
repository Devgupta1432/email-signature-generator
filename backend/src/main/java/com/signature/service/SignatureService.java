package com.signature.service;

import com.signature.model.Signature;
import com.signature.model.Template;
import com.signature.model.User;
import com.signature.repository.SignatureRepository;
import com.signature.repository.TemplateRepository;
import com.signature.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SignatureService {
    
    @Autowired
    private SignatureRepository signatureRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TemplateRepository templateRepository;

    public List<Signature> getUserSignatures(Long userId) {
        return signatureRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Optional<Signature> getSignatureById(Long id) {
        return signatureRepository.findById(id);
    }

    public Signature createSignature(Long userId, Long templateId, String contentJson, String signatureName) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        Template template = templateRepository.findById(templateId)
            .orElseThrow(() -> new RuntimeException("Template not found"));
        
        // Check if template is PRO and user doesn't have PRO access
        if (template.isPro() && !user.isPro()) {
            throw new RuntimeException("PRO template requires PRO subscription");
        }
        
        Signature signature = new Signature(user, template, contentJson, signatureName);
        return signatureRepository.save(signature);
    }

    public Signature updateSignature(Long id, String contentJson, String signatureName) {
        Signature signature = signatureRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Signature not found"));
        
        signature.setContentJson(contentJson);
        signature.setSignatureName(signatureName);
        
        return signatureRepository.save(signature);
    }

    public void deleteSignature(Long id) {
        signatureRepository.deleteById(id);
    }
}