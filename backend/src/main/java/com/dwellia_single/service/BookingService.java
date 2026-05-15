package com.dwellia_single.service;

import com.dwellia_single.model.Booking;
import com.dwellia_single.model.Unit;
import com.dwellia_single.model.UnitStatus;
import com.dwellia_single.repository.BookingRepository;
import com.dwellia_single.repository.UnitRepository;
import org.springframework.stereotype.Service;

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

        booking.setUnit(unit);

        unit.setStatus(UnitStatus.RESERVED);
        unitRepository.save(unit);

        return bookingRepository.save(booking);
    }
}
