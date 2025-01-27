package com.weather.service;

import com.weather.dto.DashboardResponse;
import com.weather.entity.User;
import com.weather.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public DashboardResponse getDashboardData(UserDetails userDetails) {
        if (userDetails == null) {
            log.error("UserDetails is null");
            throw new UsernameNotFoundException("User details not found");
        }

        String email = userDetails.getUsername();
        if (email == null || email.trim().isEmpty()) {
            log.error("Email is null or empty");
            throw new UsernameNotFoundException("Email not found in user details");
        }

        log.debug("Fetching dashboard data for user with email: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> {
                    log.error("User not found in database for email: {}", email);
                    return new UsernameNotFoundException("User not found with email: " + email);
                });

        try {
            DashboardResponse response = DashboardResponse.builder()
                    .userName(user.getName() != null ? user.getName() : "Unknown")
                    .email(user.getEmail())
                    .lastLogin(LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME))
                    .weatherPreference(user.getWeatherPreference() != null ? user.getWeatherPreference() : "Default")
                    .build();

            log.debug("Successfully built dashboard response for user: {}", email);
            return response;
        } catch (Exception e) {
            log.error("Error building dashboard response for user: {}", email, e);
            throw new RuntimeException("Error building dashboard response: " + e.getMessage());
        }
    }
}
