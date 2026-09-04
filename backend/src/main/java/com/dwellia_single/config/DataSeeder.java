package com.dwellia_single.config;

import com.dwellia_single.model.*;
import com.dwellia_single.model.enums.BookingStatus;
import com.dwellia_single.repository.UnitRepository;
import com.dwellia_single.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.dwellia_single.repository.BookingRepository;

import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UnitRepository unitRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final BookingRepository bookingRepository;

    public DataSeeder(
            UnitRepository unitRepository,
            BookingRepository bookingRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.unitRepository = unitRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        // =========================
        // SEED ADMIN
        // =========================

        if (userRepository.findByEmail("admin@dwellia.com").isEmpty()) {

            User admin = User.builder()
                    .email("admin@dwellia.com")
                    .password(passwordEncoder.encode("Admin123!"))
                    .role(Role.ROLE_ADMIN)
                    .enabled(true)
                    .build();

            userRepository.save(admin);

            System.out.println("=================================");
            System.out.println("Development admin created:");
            System.out.println("Email: admin@dwellia.com");
            System.out.println("Password: Admin123!");
            System.out.println("=================================");
        }


        // =========================
        // SEED UNITS
        // =========================

        Unit u1 = new Unit();
        u1.setTitle("Modern Downtown 1 Bedroom");
        u1.setDescription("Bright unit with city view, close to transit.");
        u1.setPrice(1450);
        u1.setBedrooms(1);
        u1.setBathrooms(1);
        u1.setStatus(UnitStatus.AVAILABLE);

        Unit u2 = new Unit();
        u2.setTitle("Spacious 2 Bedroom Family Unit");
        u2.setDescription("Perfect for families, near schools and parks.");
        u2.setPrice(1950);
        u2.setBedrooms(2);
        u2.setBathrooms(1);
        u2.setStatus(UnitStatus.AVAILABLE);

        Unit u3 = new Unit();
        u3.setTitle("Luxury 3 Bedroom Penthouse");
        u3.setDescription("Top floor, premium finishes, downtown skyline.");
        u3.setPrice(3200);
        u3.setBedrooms(3);
        u3.setBathrooms(2);
        u3.setStatus(UnitStatus.RESERVED);

        unitRepository.save(u1);
        unitRepository.save(u2);
        unitRepository.save(u3);

        // =========================
        // SEED BOOKINGS
        // =========================

        if (bookingRepository.count() == 0) {

            Booking b1 = new Booking();
            b1.setFullName("Marko Test");
            b1.setEmail("marko@test.com");
            b1.setPhone("780-555-1001");
            b1.setUnit(u1);
            b1.setScheduledAt(LocalDateTime.now().plusDays(1).withHour(10).withMinute(0).withSecond(0).withNano(0));
            b1.setStatus(BookingStatus.NEW);

            Booking b2 = new Booking();
            b2.setFullName("Ana Test");
            b2.setEmail("ana@test.com");
            b2.setPhone("780-555-1002");
            b2.setUnit(u1);
            b2.setScheduledAt(LocalDateTime.now().plusDays(1).withHour(14).withMinute(0).withSecond(0).withNano(0));
            b2.setStatus(BookingStatus.CONFIRMED);

            Booking b3 = new Booking();
            b3.setFullName("Petar Test");
            b3.setEmail("petar@test.com");
            b3.setPhone("780-555-1003");
            b3.setUnit(u2);
            b3.setScheduledAt(LocalDateTime.now().plusDays(1).withHour(11).withMinute(0).withSecond(0).withNano(0));
            b3.setStatus(BookingStatus.NEW);

            bookingRepository.save(b1);
            bookingRepository.save(b2);
            bookingRepository.save(b3);

            System.out.println("=================================");
            System.out.println("Development bookings created: 3");
            System.out.println("=================================");
        }
    }
}