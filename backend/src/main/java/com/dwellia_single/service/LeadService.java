package com.dwellia_single.service;

import com.dwellia_single.model.dto.lead.CreateLeadRequest;
import com.dwellia_single.model.dto.lead.LeadResponse;
import com.dwellia_single.model.entity.*;
import com.dwellia_single.model.enums.LeadSource;
import com.dwellia_single.model.enums.LeadStatus;
import com.dwellia_single.repository.LeadRepository;
import com.dwellia_single.repository.UnitRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LeadService {

    private final LeadRepository leadRepository;
    private final UnitRepository unitRepository;

    public LeadService(
            LeadRepository leadRepository,
            UnitRepository unitRepository
    ) {
        this.leadRepository = leadRepository;
        this.unitRepository = unitRepository;
    }

    @Transactional
    public LeadResponse createOrFindLead(CreateLeadRequest request) {

        Unit unit = null;
        Company company;

        if (request.getUnitId() != null) {

            unit = unitRepository.findById(request.getUnitId())
                    .orElseThrow(() ->
                            new RuntimeException("Unit not found")
                    );

            Property property = unit.getProperty();
            company = property.getCompany();

            Lead existingLead = leadRepository
                    .findByCompanyIdAndEmail(
                            company.getId(),
                            request.getEmail()
                    )
                    .orElse(null);

            if (existingLead != null) {
                return toResponse(existingLead);
            }
        } else {
            throw new RuntimeException(
                    "A unit is required when creating a lead."
            );
        }

        Property property = unit.getProperty();
        UnitType unitType = unit.getUnitType();

        Lead lead = new Lead();

        lead.setCompany(company);
        lead.setProperty(property);
        lead.setUnitType(unitType);
        lead.setUnit(unit);

        lead.setFirstName(request.getFirstName());
        lead.setLastName(request.getLastName());
        lead.setEmail(request.getEmail());
        lead.setPhone(request.getPhone());

        lead.setSource(LeadSource.WEBSITE);
        lead.setStatus(LeadStatus.NEW);

        Lead savedLead = leadRepository.save(lead);

        return toResponse(savedLead);
    }

    private LeadResponse toResponse(Lead lead) {

        return new LeadResponse(
                lead.getId(),
                lead.getFirstName(),
                lead.getLastName(),
                lead.getEmail(),
                lead.getPhone()
        );
    }
}
