package com.example.authservice.service;

import com.example.authservice.Exception.ResourceNotFoundException;
import com.example.authservice.dto.LoginDto;
import com.example.authservice.dto.UserRegistrationDto;
import com.example.authservice.dto.UserUpdateRequest;
import com.example.authservice.entity.User;
import com.example.authservice.repository.UserRepository;
import com.example.authservice.security.JwtTokenUtil;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;

    
    private static final String DEFAULT_ADMIN_USERNAME = "admin";
    private static final String DEFAULT_ADMIN_EMAIL = "admin@admin.com";
    private static final String DEFAULT_ADMIN_PASSWORD = "adminpass";

    @PostConstruct
    public void initDefaultAdmin() {
        if (!userRepository.existsByEmail(DEFAULT_ADMIN_EMAIL) && !userRepository.existsByUsername(DEFAULT_ADMIN_USERNAME)) {
            com.example.authservice.entity.User adminUser = com.example.authservice.entity.User.builder()
                .username(DEFAULT_ADMIN_USERNAME)
                .email(DEFAULT_ADMIN_EMAIL)
                .password(passwordEncoder.encode(DEFAULT_ADMIN_PASSWORD))
                .role("ROLE_ADMIN")
                .build();
            userRepository.save(adminUser);
        }
    }

    public User registerUser(UserRegistrationDto registrationDto) {
        if (userRepository.existsByUsername(registrationDto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        if (userRepository.existsByEmail(registrationDto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
    
        String role = registrationDto.getRole().startsWith("ROLE_") 
            ? registrationDto.getRole() 
            : "ROLE_" + registrationDto.getRole();
    
        com.example.authservice.entity.User user = com.example.authservice.entity.User.builder()
            .username(registrationDto.getUsername())
            .email(registrationDto.getEmail())
            .password(passwordEncoder.encode(registrationDto.getPassword()))
            .role(role)
            .build();
        userRepository.save(user);
        return user;
    }

    public String login(LoginDto loginDto, AuthenticationManager authenticationManager) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginDto.getEmail(), 
                    loginDto.getPassword()
                )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return jwtTokenUtil.generateToken(userDetails);
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }

   @Override
   public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
       com.example.authservice.entity.User user = userRepository.findByEmail(email)
           .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
   
       return new org.springframework.security.core.userdetails.User(
           user.getEmail(), 
           user.getPassword(), 
           Collections.singletonList(new SimpleGrantedAuthority(user.getRole()))  
       );
   }
   public List<User> getUsersByRole(String role) {
    if (role != null) {
        return userRepository.findByRole(role);
    }
    return userRepository.findAll();
}

public User updateUser(Long id, UserUpdateRequest request) {
    User user = userRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    
    user.setUsername(request.getUsername());
    user.setEmail(request.getEmail());
    if (request.getPassword() != null && !request.getPassword().isEmpty()) {
        user.setPassword(passwordEncoder.encode(request.getPassword()));
    }
    
    userRepository.save(user);
    return user;
}

public void deleteUser(Long id) {
    if (!userRepository.existsById(id)) {
        throw new ResourceNotFoundException("User not found");
    }
    userRepository.deleteById(id);
}
}