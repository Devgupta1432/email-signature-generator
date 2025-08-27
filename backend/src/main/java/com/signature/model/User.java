package com.signature.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "users")
public class User {
    @Id
    private String id;

    @NotBlank
    @Field("first_name")
    private String firstName;

    @NotBlank
    @Field("last_name")
    private String lastName;

    @Email
    @NotBlank
    private String email;

    private String password;

    private String company;

    private String mobile;

    @Field("office_number")
    private String officeNumber;

    private String designation;

    private Role role = Role.USER;

    @Field("is_verified")
    private boolean isVerified = false;

    @Field("is_pro")
    private boolean isPro = false;

    @Field("verification_token")
    private String verificationToken;

    @Field("created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    private List<String> signatureIds;
    private List<String> paymentIds;

    public enum Role {
        USER, ADMIN
    }

    // Constructors
    public User() {}

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getOfficeNumber() { return officeNumber; }
    public void setOfficeNumber(String officeNumber) { this.officeNumber = officeNumber; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }

    public boolean isVerified() { return isVerified; }
    public void setVerified(boolean verified) { isVerified = verified; }

    public boolean isPro() { return isPro; }
    public void setPro(boolean pro) { isPro = pro; }

    public String getVerificationToken() { return verificationToken; }
    public void setVerificationToken(String verificationToken) { this.verificationToken = verificationToken; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<String> getSignatureIds() { return signatureIds; }
    public void setSignatureIds(List<String> signatureIds) { this.signatureIds = signatureIds; }

    public List<String> getPaymentIds() { return paymentIds; }
    public void setPaymentIds(List<String> paymentIds) { this.paymentIds = paymentIds; }
}