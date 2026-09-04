package com.dwellia_single.repository;

import com.dwellia_single.model.Booking;
import com.dwellia_single.model.enums.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    boolean existsByUnitIdAndScheduledAtAndStatusIn(
            Long unitId,
            LocalDateTime scheduledAt,
            List<BookingStatus> statuses
    );

    boolean existsByUnitIdAndScheduledAtAndStatusInAndIdNot(
            Long unitId,
            LocalDateTime scheduledAt,
            List<BookingStatus> statuses,
            Long bookingId
    );
}
