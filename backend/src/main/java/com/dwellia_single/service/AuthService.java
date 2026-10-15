package com.dwellia_single.service;

import com.dwellia_single.model.entity.Company;
import com.dwellia_single.model.enums.Role;
import com.dwellia_single.model.entity.User;
import com.dwellia_single.repository.CompanyRepository;
import com.dwellia_single.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // TODO_COMPANY: Registration currently assigns every new user to
    // company id 1. When a proper onboarding flow exists (create company,
    // pick company, invite by company), this default should be replaced.
    private static final Long DEFAULT_COMPANY_ID = 1L;

    public User register(String email, String password) {

        Company defaultCompany = companyRepository
                .findById(DEFAULT_COMPANY_ID)
                .orElseThrow(() -> new RuntimeException(
                        "Default company not found (id=" + DEFAULT_COMPANY_ID + ")"
                ));

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(Role.ROLE_USER)
                .enabled(true)
                .company(defaultCompany)
                .build();

        return userRepository.save(user);
    }

    public String login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtService.generateToken(user.getEmail());
    }
}