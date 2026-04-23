package com.employee.project.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee.project.model.User;
import com.employee.project.service.AuthService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        String role = request.getOrDefault("role", "VIEWER");

        User user = authService.register(username, password, User.Role.valueOf(role));
        return ResponseEntity.ok(Map.of("message", "User registered successfully",
                "username", user.getUsername(), "role", user.getRole()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request, HttpServletResponse response) {
        String username = request.get("username");
        String password = request.get("password");

        String token = authService.login(username, password);

        // SameSite=None required for cross-domain cookies in production
        response.addHeader("Set-Cookie",
            "jwt=" + token + "; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=86400");

        String role = authService.getUserRole(username);
        return ResponseEntity.ok(Map.of("message", "Login successful", "role", role));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        response.addHeader("Set-Cookie",
            "jwt=; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=0");
        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }
}