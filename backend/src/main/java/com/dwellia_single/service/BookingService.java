package com.dwellia_single.service;

import com.dwellia_single.exception.BookingConflictException;
import com.dwellia_single.model.Booking;
import com.dwellia_single.model.Unit;
import com.dwellia_single.model.UnitStatus;
import com.dwellia_single.model.enums.BookingStatus;
import com.dwellia_single.repository.BookingRepository;
import com.dwellia_single.repository.UnitRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UnitRepository unitRepository;

    public BookingService(BookingRepository bookingRepository, UnitRepository unitRepository) {
        this.bookingRepository = bookingRepository;
        this.unitRepository = unitRepository;
    }

    public Booking createBooking(Long unitId, Booking booking) {

        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        if (unit.getStatus() != UnitStatus.AVAILABLE) {
            throw new RuntimeException("Unit not available");
        }

        if (booking.getScheduledAt() != null &&
                booking.getScheduledAt().isBefore(LocalDateTime.now())) {

            throw new BookingConflictException(
                    "The tour date and time must be in the future."
            );
        }

        if (booking.getScheduledAt() != null) {

            boolean duplicate = bookingRepository
                    .existsByUnitIdAndScheduledAtAndStatusIn(
                            unitId,
                            booking.getScheduledAt(),
                            List.of(
                                    BookingStatus.NEW,
                                    BookingStatus.CONFIRMED
                            )
                    );

            if (duplicate) {
                throw new BookingConflictException(
                        "This time slot is already booked for this unit"
                );
            }
        }

        booking.setUnit(unit);

        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    /*
    NEW can become:
    CONFIRMED ✅
    CANCELLED ✅

    CONFIRMED can become:
    CANCELLED ✅

    But:
    CONFIRMED → NEW ❌
    CANCELLED → NEW ❌
    CANCELLED → CONFIRMED ❌
     */
    public Booking updateBookingStatus(Long bookingId, BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        BookingStatus currentStatus = booking.getStatus();

        if (currentStatus == BookingStatus.CANCELLED) {
            throw new BookingConflictException(
                    "A cancelled booking cannot be changed."
            );
        }

        if (currentStatus == BookingStatus.CONFIRMED &&
                status != BookingStatus.CANCELLED) {
            throw new BookingConflictException(
                    "A confirmed booking can only be cancelled."
            );
        }

        booking.setStatus(status);

        return bookingRepository.save(booking);
    }

    /*
    NEW → reschedule: ✅
    CONFIRMED → reschedule: ✅
    CANCELLED → reschedule: ❌
    Past date/time: ❌
    Time occupied by another NEW/CONFIRMED booking: ❌
    Same booking keeping its existing time: ✅
    Status remains unchanged when rescheduled.
     */
    public Booking rescheduleBooking(
            Long bookingId,
            LocalDateTime newScheduledAt
    ) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BookingConflictException(
                    "A cancelled booking cannot be rescheduled."
            );
        }

        if (newScheduledAt.isBefore(LocalDateTime.now())) {
            throw new BookingConflictException(
                    "The tour date and time must be in the future."
            );
        }

        boolean duplicate = bookingRepository
                .existsByUnitIdAndScheduledAtAndStatusInAndIdNot(
                        booking.getUnit().getId(),
                        newScheduledAt,
                        List.of(
                                BookingStatus.NEW,
                                BookingStatus.CONFIRMED
                        ),
                        bookingId
                );

        if (duplicate) {
            throw new BookingConflictException(
                    "This time slot is already booked for this unit."
            );
        }

        booking.setScheduledAt(newScheduledAt);

        return bookingRepository.save(booking);
    }
}
