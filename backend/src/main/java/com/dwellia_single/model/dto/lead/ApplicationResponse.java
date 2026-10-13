package com.dwellia_single.model.dto.lead;


import com.dwellia_single.model.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ApplicationResponse {

    private Long id;
    private String applicationNumber;
    private Long leadId;
    private Long propertyId;
    private Long unitId;
    private Long unitTypeId;
    private Long showingId;
    private ApplicationStatus status;
    private LocalDateTime submittedAt;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

