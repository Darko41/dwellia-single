package com.dwellia_single.repository;

import com.dwellia_single.model.entity.Application;
import com.dwellia_single.model.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    boolean existsByApplicationNumber(String applicationNumber);

    Optional<Application> findByCompanyIdAndApplicationNumber(
            Long companyId,
            String applicationNumber
    );

    List<Application> findAllByCompanyIdAndLeadIdOrderByCreatedAtDesc(
            Long companyId,
            Long leadId
    );

    List<Application> findAllByCompanyIdAndStatusOrderByCreatedAtDesc(
            Long companyId,
            ApplicationStatus status
    );
}
