package com.dwellia_single.service;

import com.dwellia_single.exception.ShowingConflictException;
import com.dwellia_single.model.entity.Showing;
import com.dwellia_single.model.entity.Unit;
import com.dwellia_single.model.enums.UnitStatus;
import com.dwellia_single.model.enums.ShowingStatus;
import com.dwellia_single.repository.ShowingRepository;
import com.dwellia_single.repository.UnitRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ShowingService {

    private final ShowingRepository showingRepository;
    private final UnitRepository unitRepository;

    public ShowingService(
            ShowingRepository showingRepository,
            UnitRepository unitRepository
    ) {
        this.showingRepository = showingRepository;
        this.unitRepository = unitRepository;
    }

    public Showing createShowing(Long unitId, Showing showing) {

        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() -> new RuntimeException("Unit not found"));

        if (unit.getStatus() != UnitStatus.AVAILABLE) {
            throw new RuntimeException("Unit not available");
        }

        if (showing.getScheduledAt() != null &&
                showing.getScheduledAt().isBefore(LocalDateTime.now())) {

            throw new ShowingConflictException(
                    "The showing date and time must be in the future."
            );
        }

        if (showing.getScheduledAt() != null) {

            boolean duplicate = showingRepository
                    .existsByUnitIdAndScheduledAtAndStatusIn(
                            unitId,
                            showing.getScheduledAt(),
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
        }

        showing.setUnit(unit);

        return showingRepository.save(showing);
    }

    public List<Showing> getAllShowings() {
        return showingRepository.findAll();
    }

    /*
    SCHEDULED → CONFIRMED ✅
    SCHEDULED → CANCELLED ✅

    CONFIRMED → CANCELLED ✅

    CONFIRMED → SCHEDULED ❌
    CANCELLED → SCHEDULED ❌
    CANCELLED → CONFIRMED ❌
    */
    public Showing updateShowingStatus(
            Long showingId,
            ShowingStatus status
    ) {
        Showing showing = showingRepository.findById(showingId)
                .orElseThrow(() -> new RuntimeException("Showing not found"));

        ShowingStatus currentStatus = showing.getStatus();

        if (currentStatus == ShowingStatus.CANCELLED) {
            throw new ShowingConflictException(
                    "A cancelled showing cannot be changed."
            );
        }

        if (currentStatus == ShowingStatus.CONFIRMED &&
                status != ShowingStatus.CANCELLED) {

            throw new ShowingConflictException(
                    "A confirmed showing can only be cancelled."
            );
        }

        showing.setStatus(status);

        return showingRepository.save(showing);
    }

    /*
    SCHEDULED → reschedule: ✅
    CONFIRMED → reschedule: ✅
    CANCELLED → reschedule: ❌
    Past date/time: ❌
    Time occupied by another SCHEDULED/CONFIRMED showing: ❌
    Same showing keeping its existing time: ✅
    Status remains unchanged when rescheduled.
    */
    public Showing rescheduleShowing(
            Long showingId,
            LocalDateTime newScheduledAt
    ) {
        Showing showing = showingRepository.findById(showingId)
                .orElseThrow(() -> new RuntimeException("Showing not found"));

        if (showing.getStatus() == ShowingStatus.CANCELLED) {
            throw new ShowingConflictException(
                    "A cancelled showing cannot be rescheduled."
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

        return showingRepository.save(showing);
    }
}