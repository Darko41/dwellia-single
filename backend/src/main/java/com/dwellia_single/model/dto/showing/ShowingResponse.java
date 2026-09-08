package com.dwellia_single.model.dto.showing;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ShowingResponse {

    private Long id;

    private Long leadId;
    private String leadName;
    private String leadEmail;

    private Long unitId;
    private String unitNumber;

    private Long propertyId;
    private String propertyName;

    private LocalDateTime scheduledAt;

    private String status;

    private String notes;
}
