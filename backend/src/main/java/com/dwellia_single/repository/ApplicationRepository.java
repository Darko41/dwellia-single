package com.dwellia_single.repository;

import com.dwellia_single.model.entity.Application;
import com.dwellia_single.model.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("""
        SELECT MAX(a.applicationNumber)
        FROM Application a
        WHERE a.company.id = :companyId
          AND a.applicationNumber LIKE :prefix%
        """)
    Optional<String> findMaxApplicationNumberForCompanyAndPrefix(
            @Param("companyId") Long companyId,
            @Param("prefix") String prefix
    );

    boolean existsByCompanyIdAndApplicationNumber(
            Long companyId,
            String applicationNumber
    );
}
