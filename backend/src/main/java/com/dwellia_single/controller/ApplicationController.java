package com.dwellia_single.controller;

import com.dwellia_single.model.dto.lead.ApplicationResponse;
import com.dwellia_single.model.dto.lead.CreateApplicationRequest;
import com.dwellia_single.model.enums.ApplicationStatus;
import com.dwellia_single.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<ApplicationResponse> createApplication(
            @Valid @RequestBody CreateApplicationRequest request
    ) {
        ApplicationResponse response =
                applicationService.createApplication(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/{id}/submit")
    public ResponseEntity<ApplicationResponse> submitApplication(
            @PathVariable Long id
    ) {
        ApplicationResponse response =
                applicationService.submitApplication(id);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponse> getApplication(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                applicationService.getApplication(id)
        );
    }

    @GetMapping
    public ResponseEntity<List<ApplicationResponse>> listApplications(
            @RequestParam Long companyId,
            @RequestParam(required = false) Long leadId,
            @RequestParam(required = false) ApplicationStatus status
    ) {

        if (leadId != null) {
            return ResponseEntity.ok(
                    applicationService.listByLead(companyId, leadId)
            );
        }

        if (status != null) {
            return ResponseEntity.ok(
                    applicationService.listByStatus(companyId, status)
            );
        }

        return ResponseEntity.ok(
                applicationService.listByCompany(companyId)
        );
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status
    ) {
        return ResponseEntity.ok(
                applicationService.updateStatus(id, status)
        );
    }
}