package com.dwellia_single.model.entity;

import com.dwellia_single.model.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // TODO_COMPANY: When a proper company-onboarding flow exists, this
    // should be set during registration (either by picking an existing
    // company or by creating a new one). For now, AuthService assigns
    // company id 1 to every new user.
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;

    private boolean enabled = true;

    private LocalDateTime createdAt;
}