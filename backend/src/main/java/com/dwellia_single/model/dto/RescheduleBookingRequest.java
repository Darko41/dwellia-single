package com.dwellia_single.model.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class RescheduleBookingRequest {

    @NotNull(message = "Please choose a tour date and time.")
    private LocalDateTime scheduledAt;

    public LocalDateTime getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(LocalDateTime scheduledAt) {
        this.scheduledAt = scheduledAt;
    }
}
