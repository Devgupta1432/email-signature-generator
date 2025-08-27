package com.signature.controller;

import com.signature.model.Signature;
import com.signature.security.UserPrincipal;
import com.signature.service.SignatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/signatures")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SignatureController {
    
    @Autowired
    private SignatureService signatureService;

    @GetMapping
    public ResponseEntity<List<Signature>> getUserSignatures(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<Signature> signatures = signatureService.getUserSignatures(userPrincipal.getId());
        return ResponseEntity.ok(signatures);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Signature> getSignature(@PathVariable String id) {
        return signatureService.getSignatureById(id)
            .map(signature -> ResponseEntity.ok(signature))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createSignature(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody Map<String, Object> request) {
        try {
            String templateId = request.get("templateId").toString();
            String contentJson = request.get("contentJson").toString();
            String signatureName = request.get("signatureName").toString();
            
            Signature signature = signatureService.createSignature(
                userPrincipal.getId(), templateId, contentJson, signatureName);
            return ResponseEntity.ok(signature);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateSignature(
            @PathVariable String id,
            @RequestBody Map<String, String> request) {
        try {
            String contentJson = request.get("contentJson");
            String signatureName = request.get("signatureName");
            
            Signature signature = signatureService.updateSignature(id, contentJson, signatureName);
            return ResponseEntity.ok(signature);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSignature(@PathVariable String id) {
        signatureService.deleteSignature(id);
        return ResponseEntity.ok().build();
    }
}