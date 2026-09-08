package com.dwellia_single.controller;

import com.dwellia_single.model.dto.lead.CreateLeadRequest;
import com.dwellia_single.model.dto.lead.LeadResponse;
import com.dwellia_single.service.LeadService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "http://localhost:5173")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @PostMapping
    public LeadResponse createOrFindLead(
            @RequestBody @Valid CreateLeadRequest request
    ) {
        return leadService.createOrFindLead(request);
    }
}
