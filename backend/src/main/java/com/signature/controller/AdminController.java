package com.signature.controller;

import com.signature.model.User;
import com.signature.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(adminService.getStats());
    }

    @PutMapping("/users/{id}/pro")
    public ResponseEntity<String> toggleUserPro(@PathVariable String id, @RequestBody Map<String, Boolean> request) {
        adminService.updateUserProStatus(id, request.get("isPro"));
        return ResponseEntity.ok("User status updated");
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok("User deleted");
    }
}