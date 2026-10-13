package com.dwellia_single.model.dto.lead;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateApplicationRequest {

    @NotNull(message = "Lead is required.")
    private Long leadId;

    @NotNull(message = "Unit is required.")
    private Long unitId;

    private Long showingId;
}
