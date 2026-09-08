package com.dwellia_single.service;

import com.dwellia_single.exception.ShowingConflictException;
import com.dwellia_single.model.dto.showing.CreateShowingRequest;
import com.dwellia_single.model.dto.showing.ShowingResponse;
import com.dwellia_single.model.entity.Lead;
import com.dwellia_single.model.entity.Property;
import com.dwellia_single.model.entity.Showing;
import com.dwellia_single.model.entity.Unit;
import com.dwellia_single.model.enums.UnitStatus;
import com.dwellia_single.model.enums.ShowingStatus;
import com.dwellia_single.repository.LeadRepository;
import com.dwellia_single.repository.ShowingRepository;
import com.dwellia_single.repository.UnitRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ShowingService {

    private final ShowingRepository showingRepository;
    private final UnitRepository unitRepository;
    private final LeadRepository leadRepository;

    public ShowingService(
            ShowingRepository showingRepository,
            UnitRepository unitRepository,
            LeadRepository leadRepository
    ) {
        this.showingRepository = showingRepository;
        this.unitRepository = unitRepository;
        this.leadRepository = leadRepository;
    }

    @Transactional
    public ShowingResponse createShowing(
            Long unitId,
            CreateShowingRequest request
    ) {

        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        if (unit.getStatus() != UnitStatus.AVAILABLE) {
            throw new RuntimeException("Unit not available");
        }

        Lead lead = leadRepository.findById(request.getLeadId())
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        LocalDateTime scheduledAt = request.getScheduledAt();

        if (scheduledAt.isBefore(LocalDateTime.now())) {
            throw new ShowingConflictException(
                    "The showing date and time must be in the future."
            );
        }

        boolean duplicate = showingRepository
                .existsByUnitIdAndScheduledAtAndStatusIn(
                        unitId,
                        scheduledAt,
                        List.of(
                                ShowingStatus.SCHEDULED,
                                ShowingStatus.CONFIRMED
                        )
                );

        if (duplicate) {
            throw new ShowingConflictException(
                    "This time slot is already booked for this unit."
            );
        }

        Showing showing = new Showing();

        showing.setLead(lead);
        showing.setUnit(unit);
        showing.setScheduledAt(scheduledAt);
        showing.setStatus(ShowingStatus.SCHEDULED);
        showing.setNotes(request.getNotes());

        Showing savedShowing = showingRepository.save(showing);

        return toResponse(savedShowing);
    }

    @Transactional(readOnly = true)
    public List<ShowingResponse> getAllShowings() {
        return showingRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ShowingResponse updateShowingStatus(
            Long showingId,
            ShowingStatus newStatus
    ) {

        Showing showing = showingRepository.findById(showingId)
                .orElseThrow(() -> new RuntimeException("Showing not found"));

        ShowingStatus currentStatus = showing.getStatus();

        if (currentStatus == ShowingStatus.CANCELLED ||
                currentStatus == ShowingStatus.COMPLETED ||
                currentStatus == ShowingStatus.NO_SHOW) {

            throw new ShowingConflictException(
                    "A completed, cancelled, or no-show showing cannot be changed."
            );
        }

        boolean validTransition =
                (currentStatus == ShowingStatus.SCHEDULED &&
                        (newStatus == ShowingStatus.CONFIRMED ||
                                newStatus == ShowingStatus.CANCELLED))

                        ||

                        (currentStatus == ShowingStatus.CONFIRMED &&
                                (newStatus == ShowingStatus.COMPLETED ||
                                        newStatus == ShowingStatus.NO_SHOW ||
                                        newStatus == ShowingStatus.CANCELLED));

        if (!validTransition) {
            throw new ShowingConflictException(
                    "Invalid showing status transition."
            );
        }

        showing.setStatus(newStatus);

        return toResponse(showingRepository.save(showing));
    }

    /*
    SCHEDULED → CONFIRMED     ✅
    SCHEDULED → CANCELLED     ✅
    SCHEDULED → COMPLETED     ❌
    SCHEDULED → NO_SHOW       ❌
    CONFIRMED → COMPLETED     ✅
    CONFIRMED → NO_SHOW       ✅
    CONFIRMED → CANCELLED     ✅
    COMPLETED → anything      ❌
    NO_SHOW → anything        ❌
    CANCELLED → anything      ❌
    */

    @Transactional
    public ShowingResponse rescheduleShowing(
            Long showingId,
            LocalDateTime newScheduledAt
    ) {

        Showing showing = showingRepository.findById(showingId)
                .orElseThrow(() -> new RuntimeException("Showing not found"));

        if (showing.getStatus() == ShowingStatus.CANCELLED ||
                showing.getStatus() == ShowingStatus.COMPLETED ||
                showing.getStatus() == ShowingStatus.NO_SHOW) {

            throw new ShowingConflictException(
                    "A completed, cancelled, or no-show showing cannot be rescheduled."
            );
        }

        if (newScheduledAt.isBefore(LocalDateTime.now())) {
            throw new ShowingConflictException(
                    "The showing date and time must be in the future."
            );
        }

        boolean duplicate = showingRepository
                .existsByUnitIdAndScheduledAtAndStatusInAndIdNot(
                        showing.getUnit().getId(),
                        newScheduledAt,
                        List.of(
                                ShowingStatus.SCHEDULED,
                                ShowingStatus.CONFIRMED
                        ),
                        showingId
                );

        if (duplicate) {
            throw new ShowingConflictException(
                    "This time slot is already booked for this unit."
            );
        }

        showing.setScheduledAt(newScheduledAt);

        return toResponse(showingRepository.save(showing));
    }

    private ShowingResponse toResponse(Showing showing) {

        Lead lead = showing.getLead();
        Unit unit = showing.getUnit();
        Property property = unit.getProperty();

        String leadName =
                lead.getFirstName() + " " + lead.getLastName();

        return new ShowingResponse(
                showing.getId(),
                lead.getId(),
                leadName,
                lead.getEmail(),
                unit.getId(),
                unit.getUnitNumber(),
                property.getId(),
                property.getName(),
                showing.getScheduledAt(),
                showing.getStatus().name(),
                showing.getNotes()
        );
    }
}