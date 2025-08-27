package com.signature.service;

import com.signature.model.User;
import com.signature.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalUsers = userRepository.count();
        long proUsers = userRepository.countByIsPro(true);
        
        stats.put("totalUsers", totalUsers);
        stats.put("proUsers", proUsers);
        stats.put("totalTemplates", 8); // Static for now
        stats.put("totalSignatures", totalUsers * 2); // Estimate
        
        return stats;
    }

    public void updateUserProStatus(String userId, Boolean isPro) {
        User user = userRepository.findById(userId).orElseThrow();
        user.setPro(isPro);
        userRepository.save(user);
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }
}