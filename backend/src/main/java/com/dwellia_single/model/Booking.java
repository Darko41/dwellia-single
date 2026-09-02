package com.dwellia_single.model;

import com.dwellia_single.model.enums.BookingStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.NEW;

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private Unit unit;

    @NotNull(message = "Please choose a tour date and time.")
    @Column(nullable = false)
    private LocalDateTime scheduledAt;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();

        if (status == null) {
            status = BookingStatus.NEW;
        }
    }
}