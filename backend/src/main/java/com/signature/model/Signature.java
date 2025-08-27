package com.signature.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.time.LocalDateTime;

@Document(collection = "signatures")
public class Signature {
    @Id
    private String id;

    @Field("user_id")
    private String userId;

    @Field("template_id")
    private String templateId;

    @Field("content_json")
    private String contentJson;

    @Field("signature_name")
    private String signatureName;

    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Field("updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Constructors
    public Signature() {}

    public Signature(String userId, String templateId, String contentJson, String signatureName) {
        this.userId = userId;
        this.templateId = templateId;
        this.contentJson = contentJson;
        this.signatureName = signatureName;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getTemplateId() { return templateId; }
    public void setTemplateId(String templateId) { this.templateId = templateId; }

    public String getContentJson() { return contentJson; }
    public void setContentJson(String contentJson) { this.contentJson = contentJson; }

    public String getSignatureName() { return signatureName; }
    public void setSignatureName(String signatureName) { this.signatureName = signatureName; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}