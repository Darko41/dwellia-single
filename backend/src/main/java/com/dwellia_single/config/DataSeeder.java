package com.dwellia_single.config;

import com.dwellia_single.model.entity.City;
import com.dwellia_single.model.entity.Company;
import com.dwellia_single.model.entity.Lead;
import com.dwellia_single.model.entity.Portfolio;
import com.dwellia_single.model.entity.Property;
import com.dwellia_single.model.entity.Showing;
import com.dwellia_single.model.entity.Unit;
import com.dwellia_single.model.entity.UnitType;
import com.dwellia_single.model.entity.User;
import com.dwellia_single.model.entity.Province;

import com.dwellia_single.model.enums.CompanyStatus;
import com.dwellia_single.model.enums.LeadSource;
import com.dwellia_single.model.enums.LeadStatus;
import com.dwellia_single.model.enums.PortfolioStatus;
import com.dwellia_single.model.enums.PropertyStatus;
import com.dwellia_single.model.enums.PropertyType;
import com.dwellia_single.model.enums.Role;
import com.dwellia_single.model.enums.ShowingStatus;
import com.dwellia_single.model.enums.UnitStatus;
import com.dwellia_single.model.enums.UnitTypeStatus;

import com.dwellia_single.repository.CityRepository;
import com.dwellia_single.repository.CompanyRepository;
import com.dwellia_single.repository.LeadRepository;
import com.dwellia_single.repository.PortfolioRepository;
import com.dwellia_single.repository.PropertyRepository;
import com.dwellia_single.repository.ProvinceRepository;
import com.dwellia_single.repository.ShowingRepository;
import com.dwellia_single.repository.UnitRepository;
import com.dwellia_single.repository.UnitTypeRepository;
import com.dwellia_single.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CompanyRepository companyRepository;
    private final ProvinceRepository provinceRepository;
    private final CityRepository cityRepository;
    private final PortfolioRepository portfolioRepository;
    private final PropertyRepository propertyRepository;
    private final UnitTypeRepository unitTypeRepository;
    private final UnitRepository unitRepository;
    private final LeadRepository leadRepository;
    private final ShowingRepository showingRepository;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(
            CompanyRepository companyRepository,
            ProvinceRepository provinceRepository,
            CityRepository cityRepository,
            PortfolioRepository portfolioRepository,
            PropertyRepository propertyRepository,
            UnitTypeRepository unitTypeRepository,
            UnitRepository unitRepository,
            LeadRepository leadRepository,
            ShowingRepository showingRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.companyRepository = companyRepository;
        this.provinceRepository = provinceRepository;
        this.cityRepository = cityRepository;
        this.portfolioRepository = portfolioRepository;
        this.propertyRepository = propertyRepository;
        this.unitTypeRepository = unitTypeRepository;
        this.unitRepository = unitRepository;
        this.leadRepository = leadRepository;
        this.showingRepository = showingRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        // =========================
        // SEED ADMIN
        // =========================

        User admin = userRepository.findByEmail("admin@dwellia.com")
                .orElseGet(() -> {
                    User user = User.builder()
                            .email("admin@dwellia.com")
                            .password(passwordEncoder.encode("Admin123!"))
                            .role(Role.ROLE_ADMIN)
                            .enabled(true)
                            .build();

                    User savedUser = userRepository.save(user);

                    System.out.println("=================================");
                    System.out.println("Development admin created:");
                    System.out.println("Email: admin@dwellia.com");
                    System.out.println("Password: Admin123!");
                    System.out.println("=================================");

                    return savedUser;
                });


        // =========================
        // COMPANY
        // =========================

        Company company = companyRepository.findAll()
                .stream()
                .filter(c -> c.getName().equals("Dwellia Property Management"))
                .findFirst()
                .orElseGet(() -> {

                    Company newCompany = new Company();

                    newCompany.setName("Dwellia Property Management");
                    newCompany.setLegalName(
                            "Dwellia Property Management Inc."
                    );
                    newCompany.setEmail("contact@dwellia.com");
                    newCompany.setPhone("780-555-0000");
                    newCompany.setWebsite("https://dwellia.com");
                    newCompany.setStatus(CompanyStatus.ACTIVE);

                    return companyRepository.save(newCompany);
                });


        // =========================
        // PROVINCE
        // =========================

        Province alberta = provinceRepository.findAll()
                .stream()
                .filter(p -> p.getCode().equals("AB"))
                .findFirst()
                .orElseGet(() -> {

                    Province newProvince = new Province();

                    newProvince.setName("Alberta");
                    newProvince.setCode("AB");

                    return provinceRepository.save(newProvince);
                });


        // =========================
        // CITY
        // =========================

        City edmonton = cityRepository.findAll()
                .stream()
                .filter(c ->
                        c.getName().equals("Edmonton")
                                && c.getProvince().getId().equals(alberta.getId())
                )
                .findFirst()
                .orElseGet(() -> {

                    City newCity = new City();

                    newCity.setProvince(alberta);
                    newCity.setName("Edmonton");

                    return cityRepository.save(newCity);
                });


        // =========================
        // PORTFOLIO
        // =========================

        Portfolio portfolio = portfolioRepository.findAll()
                .stream()
                .filter(p ->
                        p.getCompany().getId().equals(company.getId())
                                && p.getName().equals(
                                "Edmonton Residential Portfolio"
                        )
                )
                .findFirst()
                .orElseGet(() -> {

                    Portfolio newPortfolio = new Portfolio();

                    newPortfolio.setCompany(company);
                    newPortfolio.setName(
                            "Edmonton Residential Portfolio"
                    );
                    newPortfolio.setDescription(
                            "Development residential portfolio."
                    );
                    newPortfolio.setStatus(PortfolioStatus.ACTIVE);

                    return portfolioRepository.save(newPortfolio);
                });


        // =========================
        // PROPERTY
        // =========================

        Property property = propertyRepository.findAll()
                .stream()
                .filter(p ->
                        p.getCompany().getId().equals(company.getId())
                                && p.getName().equals(
                                "Downtown Edmonton Apartments"
                        )
                )
                .findFirst()
                .orElseGet(() -> {

                    Property newProperty = new Property();

                    newProperty.setCompany(company);
                    newProperty.setPortfolio(portfolio);
                    newProperty.setCity(edmonton);
                    newProperty.setName(
                            "Downtown Edmonton Apartments"
                    );
                    newProperty.setAddress("100 Main Street");
                    newProperty.setPostalCode("T5J 1A1");
                    newProperty.setPropertyType(PropertyType.APARTMENT);
                    newProperty.setDescription(
                            "Modern apartment property in downtown Edmonton."
                    );
                    newProperty.setYearBuilt(2020);
                    newProperty.setStatus(PropertyStatus.ACTIVE);

                    return propertyRepository.save(newProperty);
                });


        // =========================
        // UNIT TYPE 1
        // =========================

        UnitType oneBedroom = unitTypeRepository.findAll()
                .stream()
                .filter(ut ->
                        ut.getProperty().getId().equals(property.getId())
                                && ut.getName().equals("1 Bedroom")
                )
                .findFirst()
                .orElseGet(() -> {

                    UnitType newUnitType = new UnitType();

                    newUnitType.setProperty(property);
                    newUnitType.setName("1 Bedroom");
                    newUnitType.setDescription(
                            "Modern one-bedroom apartment."
                    );
                    newUnitType.setBedrooms(1);
                    newUnitType.setBathrooms(
                            new BigDecimal("1.0")
                    );
                    newUnitType.setSquareFeet(650);
                    newUnitType.setStartingRent(
                            new BigDecimal("1450.00")
                    );
                    newUnitType.setDeposit(
                            new BigDecimal("1450.00")
                    );
                    newUnitType.setStatus(UnitTypeStatus.ACTIVE);

                    return unitTypeRepository.save(newUnitType);
                });


        // =========================
        // UNIT TYPE 2
        // =========================

        UnitType twoBedroom = unitTypeRepository.findAll()
                .stream()
                .filter(ut ->
                        ut.getProperty().getId().equals(property.getId())
                                && ut.getName().equals("2 Bedroom")
                )
                .findFirst()
                .orElseGet(() -> {

                    UnitType newUnitType = new UnitType();

                    newUnitType.setProperty(property);
                    newUnitType.setName("2 Bedroom");
                    newUnitType.setDescription(
                            "Spacious two-bedroom apartment suitable for families."
                    );
                    newUnitType.setBedrooms(2);
                    newUnitType.setBathrooms(
                            new BigDecimal("1.0")
                    );
                    newUnitType.setSquareFeet(850);
                    newUnitType.setStartingRent(
                            new BigDecimal("1950.00")
                    );
                    newUnitType.setDeposit(
                            new BigDecimal("1950.00")
                    );
                    newUnitType.setStatus(UnitTypeStatus.ACTIVE);

                    return unitTypeRepository.save(newUnitType);
                });


        // =========================
        // UNIT TYPE 3
        // =========================

        UnitType threeBedroom = unitTypeRepository.findAll()
                .stream()
                .filter(ut ->
                        ut.getProperty().getId().equals(property.getId())
                                && ut.getName().equals(
                                "3 Bedroom Penthouse"
                        )
                )
                .findFirst()
                .orElseGet(() -> {

                    UnitType newUnitType = new UnitType();

                    newUnitType.setProperty(property);
                    newUnitType.setName("3 Bedroom Penthouse");
                    newUnitType.setDescription(
                            "Luxury top-floor three-bedroom penthouse."
                    );
                    newUnitType.setBedrooms(3);
                    newUnitType.setBathrooms(
                            new BigDecimal("2.0")
                    );
                    newUnitType.setSquareFeet(1200);
                    newUnitType.setStartingRent(
                            new BigDecimal("3200.00")
                    );
                    newUnitType.setDeposit(
                            new BigDecimal("3200.00")
                    );
                    newUnitType.setStatus(UnitTypeStatus.ACTIVE);

                    return unitTypeRepository.save(newUnitType);
                });


        // =========================
        // UNIT 101
        // =========================

        Unit u1 = unitRepository.findAll()
                .stream()
                .filter(u ->
                        u.getProperty().getId().equals(property.getId())
                                && u.getUnitNumber().equals("101")
                )
                .findFirst()
                .orElseGet(() -> {

                    Unit newUnit = new Unit();

                    newUnit.setProperty(property);
                    newUnit.setUnitType(oneBedroom);
                    newUnit.setUnitNumber("101");
                    newUnit.setFloor(1);
                    newUnit.setRent(
                            new BigDecimal("1450.00")
                    );
                    newUnit.setStatus(UnitStatus.AVAILABLE);

                    return unitRepository.save(newUnit);
                });


        // =========================
        // UNIT 201
        // =========================

        Unit u2 = unitRepository.findAll()
                .stream()
                .filter(u ->
                        u.getProperty().getId().equals(property.getId())
                                && u.getUnitNumber().equals("201")
                )
                .findFirst()
                .orElseGet(() -> {

                    Unit newUnit = new Unit();

                    newUnit.setProperty(property);
                    newUnit.setUnitType(twoBedroom);
                    newUnit.setUnitNumber("201");
                    newUnit.setFloor(2);
                    newUnit.setRent(
                            new BigDecimal("1950.00")
                    );
                    newUnit.setStatus(UnitStatus.AVAILABLE);

                    return unitRepository.save(newUnit);
                });


        // =========================
        // UNIT 301
        // =========================

        Unit u3 = unitRepository.findAll()
                .stream()
                .filter(u ->
                        u.getProperty().getId().equals(property.getId())
                                && u.getUnitNumber().equals("301")
                )
                .findFirst()
                .orElseGet(() -> {

                    Unit newUnit = new Unit();

                    newUnit.setProperty(property);
                    newUnit.setUnitType(threeBedroom);
                    newUnit.setUnitNumber("301");
                    newUnit.setFloor(3);
                    newUnit.setRent(
                            new BigDecimal("3200.00")
                    );
                    newUnit.setStatus(UnitStatus.RESERVED);

                    return unitRepository.save(newUnit);
                });


        // =========================
        // LEAD 1
        // =========================

        Lead lead1 = leadRepository.findAll()
                .stream()
                .filter(l ->
                        l.getEmail().equals("marko@test.com")
                )
                .findFirst()
                .orElseGet(() -> {

                    Lead newLead = new Lead();

                    newLead.setCompany(company);
                    newLead.setProperty(property);
                    newLead.setUnitType(oneBedroom);
                    newLead.setUnit(u1);
                    newLead.setFirstName("Marko");
                    newLead.setLastName("Test");
                    newLead.setEmail("marko@test.com");
                    newLead.setPhone("780-555-1001");
                    newLead.setSource(LeadSource.WEBSITE);
                    newLead.setStatus(LeadStatus.NEW);

                    return leadRepository.save(newLead);
                });


        // =========================
        // LEAD 2
        // =========================

        Lead lead2 = leadRepository.findAll()
                .stream()
                .filter(l ->
                        l.getEmail().equals("ana@test.com")
                )
                .findFirst()
                .orElseGet(() -> {

                    Lead newLead = new Lead();

                    newLead.setCompany(company);
                    newLead.setProperty(property);
                    newLead.setUnitType(oneBedroom);
                    newLead.setUnit(u1);
                    newLead.setFirstName("Ana");
                    newLead.setLastName("Test");
                    newLead.setEmail("ana@test.com");
                    newLead.setPhone("780-555-1002");
                    newLead.setSource(LeadSource.WEBSITE);
                    newLead.setStatus(LeadStatus.NEW);

                    return leadRepository.save(newLead);
                });


        // =========================
        // LEAD 3
        // =========================

        Lead lead3 = leadRepository.findAll()
                .stream()
                .filter(l ->
                        l.getEmail().equals("petar@test.com")
                )
                .findFirst()
                .orElseGet(() -> {

                    Lead newLead = new Lead();

                    newLead.setCompany(company);
                    newLead.setProperty(property);
                    newLead.setUnitType(twoBedroom);
                    newLead.setUnit(u2);
                    newLead.setFirstName("Petar");
                    newLead.setLastName("Test");
                    newLead.setEmail("petar@test.com");
                    newLead.setPhone("780-555-1003");
                    newLead.setSource(LeadSource.WEBSITE);
                    newLead.setStatus(LeadStatus.NEW);

                    return leadRepository.save(newLead);
                });


        // =========================
        // SHOWING 1
        // =========================

        LocalDateTime showingTime1 =
                LocalDateTime.now()
                        .plusDays(1)
                        .withHour(10)
                        .withMinute(0)
                        .withSecond(0)
                        .withNano(0);

        createShowingIfMissing(
                lead1,
                u1,
                showingTime1,
                ShowingStatus.SCHEDULED
        );


        // =========================
        // SHOWING 2
        // =========================

        LocalDateTime showingTime2 =
                LocalDateTime.now()
                        .plusDays(1)
                        .withHour(14)
                        .withMinute(0)
                        .withSecond(0)
                        .withNano(0);

        createShowingIfMissing(
                lead2,
                u1,
                showingTime2,
                ShowingStatus.CONFIRMED
        );


        // =========================
        // SHOWING 3
        // =========================

        LocalDateTime showingTime3 =
                LocalDateTime.now()
                        .plusDays(1)
                        .withHour(11)
                        .withMinute(0)
                        .withSecond(0)
                        .withNano(0);

        createShowingIfMissing(
                lead3,
                u2,
                showingTime3,
                ShowingStatus.SCHEDULED
        );


        System.out.println("=================================");
        System.out.println("Development data verified.");
        System.out.println("Company: Dwellia Property Management");
        System.out.println("Property: Downtown Edmonton Apartments");
        System.out.println("Unit Types: 3");
        System.out.println("Units: 3");
        System.out.println("Leads: 3");
        System.out.println("Showings: 3");
        System.out.println("=================================");
    }


    private void createShowingIfMissing(
            Lead lead,
            Unit unit,
            LocalDateTime scheduledAt,
            ShowingStatus status
    ) {

        boolean exists = showingRepository.findAll()
                .stream()
                .anyMatch(showing ->
                        showing.getLead().getId().equals(lead.getId())
                                && showing.getUnit().getId().equals(unit.getId())
                                && showing.getScheduledAt().equals(scheduledAt)
                );

        if (!exists) {

            Showing showing = new Showing();

            showing.setLead(lead);
            showing.setUnit(unit);
            showing.setScheduledAt(scheduledAt);
            showing.setStatus(status);

            showingRepository.save(showing);
        }
    }
}