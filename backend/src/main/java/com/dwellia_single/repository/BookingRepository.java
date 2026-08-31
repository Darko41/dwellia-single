package com.dwellia_single.repository;

import com.dwellia_single.model.Booking;
import com.dwellia_single.model.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    boolean existsByUnitIdAndScheduledAtAndStatus(
            Long unitId,
            LocalDateTime scheduledAt,
            BookingStatus status
    );
}
