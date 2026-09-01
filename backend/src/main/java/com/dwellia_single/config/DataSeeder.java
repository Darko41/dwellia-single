package com.dwellia_single.config;

import com.dwellia_single.model.Role;
import com.dwellia_single.model.Unit;
import com.dwellia_single.model.UnitStatus;
import com.dwellia_single.model.User;
import com.dwellia_single.repository.UnitRepository;
import com.dwellia_single.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UnitRepository unitRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(
            UnitRepository unitRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.unitRepository = unitRepository;
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

        if (unitRepository.count() > 0) {
            return;
        }

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
    }
}