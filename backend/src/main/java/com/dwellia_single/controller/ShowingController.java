package com.dwellia_single.controller;

import com.dwellia_single.model.entity.Showing;
import com.dwellia_single.model.dto.RescheduleShowingRequest;
import com.dwellia_single.model.enums.ShowingStatus;
import com.dwellia_single.service.ShowingService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/showings")
@CrossOrigin(origins = "http://localhost:5173")
public class ShowingController {

    private final ShowingService showingService;

    public ShowingController(ShowingService showingService) {
        this.showingService = showingService;
    }

    @PostMapping("/{unitId}")
    public Showing createShowing(
            @PathVariable Long unitId,
            @RequestBody @Valid Showing showing
    ) {
        return showingService.createShowing(unitId, showing);
    }

    @GetMapping
    public List<Showing> getAllShowings() {
        return showingService.getAllShowings();
    }

    @PatchMapping("/{showingId}/status")
    public Showing updateShowingStatus(
            @PathVariable Long showingId,
            @RequestParam ShowingStatus status
    ) {
        return showingService.updateShowingStatus(showingId, status);
    }

    @PatchMapping("/{showingId}/schedule")
    public Showing rescheduleShowing(
            @PathVariable Long showingId,
            @RequestBody @Valid RescheduleShowingRequest request
    ) {
        return showingService.rescheduleShowing(
                showingId,
                request.getScheduledAt()
        );
    }
}