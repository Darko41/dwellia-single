package com.dwellia_single.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String phone;

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private Unit unit;

    private LocalDateTime createdAt = LocalDateTime.now();
}