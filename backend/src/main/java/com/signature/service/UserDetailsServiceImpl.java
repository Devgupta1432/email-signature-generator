package com.signature.service;

import com.signature.model.User;
import com.signature.repository.UserRepository;
import com.signature.security.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    
    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);
    
    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.debug("Loading user by email: {}", email);
        
        try {
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> {
                        logger.warn("User not found with email: {}", email);
                        return new UsernameNotFoundException("User Not Found with email: " + email);
                    });
            
            logger.debug("User loaded successfully: {}, verified: {}, role: {}", 
                email, user.isVerified(), user.getRole());
            
            return UserPrincipal.create(user);
        } catch (Exception e) {
            logger.error("Failed to load user by email: {} - Error: {}", email, e.getMessage(), e);
            throw e;
        }
    }
}