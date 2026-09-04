package com.dwellia_single.service;

import com.dwellia_single.model.dto.UnitResponse;
import com.dwellia_single.model.entity.Property;
import com.dwellia_single.model.entity.Unit;
import com.dwellia_single.model.entity.UnitType;
import com.dwellia_single.repository.UnitRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UnitService {

    private final UnitRepository unitRepository;

    public UnitService(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    @Transactional(readOnly = true)
    public List<UnitResponse> getAllUnits() {
        return unitRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public Unit createUnit(Unit unit) {
        return unitRepository.save(unit);
    }

    @Transactional(readOnly = true)
    public UnitResponse getUnitById(Long id) {
        Unit unit = unitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        return toResponse(unit);
    }

    private UnitResponse toResponse(Unit unit) {

        Property property = unit.getProperty();
        UnitType unitType = unit.getUnitType();

        return new UnitResponse(
                unit.getId(),
                unit.getUnitNumber(),
                unit.getRent(),
                unit.getStatus().name(),
                unit.getSquareFeet(),
                unit.getAvailabilityDate(),

                property.getId(),
                property.getName(),
                property.getCity().getName(),

                unitType.getId(),
                unitType.getName(),
                unitType.getBedrooms(),
                unitType.getBathrooms()
        );
    }
}
