package com.weather.controller;

import com.weather.dto.DashboardResponse;
import com.weather.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/user")  
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponse> getDashboardData(@AuthenticationPrincipal UserDetails userDetails) {
        log.debug("Received dashboard request for user: {}", userDetails != null ? userDetails.getUsername() : "null");
        
        if (userDetails == null) {
            log.error("UserDetails is null - user is not authenticated");
            return ResponseEntity.badRequest().build();
        }

        try {
            DashboardResponse response = dashboardService.getDashboardData(userDetails);
            log.debug("Successfully retrieved dashboard data for user: {}", userDetails.getUsername());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error retrieving dashboard data for user: {}", userDetails.getUsername(), e);
            throw e;
        }
    }
}
