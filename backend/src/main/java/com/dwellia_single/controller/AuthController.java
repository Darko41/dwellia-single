package com.dwellia_single.controller;

import com.dwellia_single.model.User;
import com.dwellia_single.model.dto.AuthRequest;
import com.dwellia_single.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public User register(@RequestBody AuthRequest request) {
        return authService.register(request.getEmail(), request.getPassword());
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody AuthRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());

        return Map.of("token", token);
    }

    @GetMapping("/me")
    public ResponseEntity<User> me(Authentication authentication) {

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow();

        return ResponseEntity.ok(user);
    }
}