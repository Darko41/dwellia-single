package com.dwellia_single.config;

import com.dwellia_single.model.Unit;
import com.dwellia_single.model.UnitStatus;
import com.dwellia_single.repository.UnitRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UnitRepository unitRepository;

    public DataSeeder(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    @Override
    public void run(String... args) {

        if (unitRepository.count() > 0) {
            return; // prevents duplicate inserts on restart
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