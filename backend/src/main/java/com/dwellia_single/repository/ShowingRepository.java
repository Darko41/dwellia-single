package com.dwellia_single.repository;

import com.dwellia_single.model.entity.Showing;
import com.dwellia_single.model.enums.ShowingStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ShowingRepository extends JpaRepository<Showing, Long> {

    boolean existsByUnitIdAndScheduledAtAndStatusIn(
            Long unitId,
            LocalDateTime scheduledAt,
            List<ShowingStatus> statuses
    );

    boolean existsByUnitIdAndScheduledAtAndStatusInAndIdNot(
            Long unitId,
            LocalDateTime scheduledAt,
            List<ShowingStatus> statuses,
            Long showingId
    );
}
