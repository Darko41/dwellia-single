package com.dwellia_single.repository;

import com.dwellia_single.model.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LeadRepository extends JpaRepository<Lead, Long> {

    Optional<Lead> findByCompanyIdAndEmail(
            Long companyId,
            String email
    );
}
