package com.dwellia_single.controller;

import com.dwellia_single.model.Unit;
import com.dwellia_single.service.UnitService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/units")
@CrossOrigin(origins = "http://localhost:5173")
public class UnitController {

    private final UnitService unitService;

    public UnitController(UnitService unitService) {
        this.unitService = unitService;
    }

    @GetMapping
    public List<Unit> getAllUnits() {
        return unitService.getAllUnits();
    }

    @PostMapping
    public Unit createUnit(@RequestBody Unit unit) {
        return unitService.createUnit(unit);
    }

    @GetMapping("/{id}")
    public Unit getUnitById(@PathVariable Long id) {
        return unitService.getUnitById(id);
    }
}