package com.dwellia_single.model.dto.showing;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class CreateShowingRequest {

    @NotNull(message = "Lead is required.")
    private Long leadId;

    @NotNull(message = "Please choose a tour date and time.")
    private LocalDateTime scheduledAt;

    private String notes;
}
