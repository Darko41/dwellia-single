package com.dwellia_single.controller;

import com.dwellia_single.model.dto.showing.CreateShowingRequest;
import com.dwellia_single.model.dto.showing.ShowingResponse;
import com.dwellia_single.model.dto.showing.RescheduleShowingRequest;
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
    public ShowingResponse createShowing(
            @PathVariable Long unitId,
            @RequestBody @Valid CreateShowingRequest request
    ) {
        return showingService.createShowing(unitId, request);
    }

    @GetMapping
    public List<ShowingResponse> getAllShowings() {
        return showingService.getAllShowings();
    }

    @PatchMapping("/{showingId}/status")
    public ShowingResponse updateShowingStatus(
            @PathVariable Long showingId,
            @RequestParam ShowingStatus status
    ) {
        return showingService.updateShowingStatus(
                showingId,
                status
        );
    }

    @PatchMapping("/{showingId}/schedule")
    public ShowingResponse rescheduleShowing(
            @PathVariable Long showingId,
            @RequestBody @Valid RescheduleShowingRequest request
    ) {
        return showingService.rescheduleShowing(
                showingId,
                request.getScheduledAt()
        );
    }
}