package com.dwellia_single.controller;

import com.dwellia_single.model.Booking;
import com.dwellia_single.service.BookingService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/{unitId}")
    public Booking createBooking(
            @PathVariable Long unitId,
            @RequestBody Booking booking
    ) {
        return bookingService.createBooking(unitId, booking);
    }
}
