package com.signature.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "templates")
public class Template {
    @Id
    private String id;

    private String name;

    private Category category;

    @Field("is_pro")
    private boolean isPro = false;

    @Field("uploaded_by")
    private String uploadedBy;

    private String content;

    @Field("preview_image")
    private String previewImage;

    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    private List<String> signatureIds;

    public enum Category {
        STATIC, ANIMATED
    }

    // Constructors
    public Template() {}

    public Template(String name, Category category, boolean isPro, String content) {
        this.name = name;
        this.category = category;
        this.isPro = isPro;
        this.content = content;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public boolean isPro() { return isPro; }
    public void setPro(boolean pro) { isPro = pro; }

    public String getUploadedBy() { return uploadedBy; }
    public void setUploadedBy(String uploadedBy) { this.uploadedBy = uploadedBy; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getPreviewImage() { return previewImage; }
    public void setPreviewImage(String previewImage) { this.previewImage = previewImage; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<String> getSignatureIds() { return signatureIds; }
    public void setSignatureIds(List<String> signatureIds) { this.signatureIds = signatureIds; }
}