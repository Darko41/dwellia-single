package com.dwellia_single.service;

import com.dwellia_single.model.dto.lead.ApplicationResponse;
import com.dwellia_single.model.dto.lead.CreateApplicationRequest;
import com.dwellia_single.exception.ApplicationConflictException;
import com.dwellia_single.model.entity.Application;
import com.dwellia_single.model.entity.Lead;
import com.dwellia_single.model.entity.Showing;
import com.dwellia_single.model.entity.Unit;
import com.dwellia_single.model.entity.UnitType;
import com.dwellia_single.model.enums.ApplicationStatus;
import com.dwellia_single.model.enums.UnitStatus;
import com.dwellia_single.repository.ApplicationRepository;
import com.dwellia_single.repository.LeadRepository;
import com.dwellia_single.repository.ShowingRepository;
import com.dwellia_single.repository.UnitRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {

    /*
     * Temporary constant.
     * This will eventually move to the application-policy layer
     * (company/property/province configurable). Do not treat as final.
     */
    private static final int EXPIRATION_DAYS = 14;

    private final ApplicationRepository applicationRepository;
    private final ApplicationNumberGenerator applicationNumberGenerator;
    private final LeadRepository leadRepository;
    private final UnitRepository unitRepository;
    private final ShowingRepository showingRepository;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            ApplicationNumberGenerator applicationNumberGenerator,
            LeadRepository leadRepository,
            UnitRepository unitRepository,
            ShowingRepository showingRepository
    ) {
        this.applicationRepository = applicationRepository;
        this.applicationNumberGenerator = applicationNumberGenerator;
        this.leadRepository = leadRepository;
        this.unitRepository = unitRepository;
        this.showingRepository = showingRepository;
    }

    @Transactional
    public ApplicationResponse createApplication(CreateApplicationRequest request) {

        Lead lead = leadRepository.findById(request.getLeadId())
                .orElseThrow(() -> new ApplicationConflictException("Lead not found."));

        Unit unit = unitRepository.findById(request.getUnitId())
                .orElseThrow(() -> new ApplicationConflictException("Unit not found."));

        Long companyId = lead.getCompany().getId();

        if (!unit.getProperty().getCompany().getId().equals(companyId)) {
            throw new ApplicationConflictException(
                    "Unit does not belong to the lead's company."
            );
        }

        UnitType unitType = unit.getUnitType();

        Showing showing = null;

        if (request.getShowingId() != null) {

            showing = showingRepository.findById(request.getShowingId())
                    .orElseThrow(() -> new ApplicationConflictException("Showing not found."));

            if (!showing.getLead().getId().equals(lead.getId())) {
                throw new ApplicationConflictException(
                        "Showing does not belong to this lead."
                );
            }

            if (!showing.getUnit().getId().equals(unit.getId())) {
                throw new ApplicationConflictException(
                        "Showing is for a different unit."
                );
            }
        }

        Application application = new Application();

        application.setApplicationNumber(
                applicationNumberGenerator.generate(companyId)
        );
        application.setCompany(lead.getCompany());
        application.setLead(lead);
        application.setProperty(unit.getProperty());
        application.setUnitType(unitType);
        application.setUnit(unit);
        application.setShowing(showing);
        application.setStatus(ApplicationStatus.DRAFT);

        Application saved = applicationRepository.save(application);

        return toResponse(saved);
    }

    @Transactional
    public ApplicationResponse submitApplication(Long applicationId) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ApplicationConflictException("Application not found."));

        if (application.getStatus() != ApplicationStatus.DRAFT) {
            throw new ApplicationConflictException(
                    "Only a DRAFT application can be submitted."
            );
        }

        Unit unit = application.getUnit();

        if (unit.getStatus() != UnitStatus.AVAILABLE) {
            throw new ApplicationConflictException(
                    "Unit is not available."
            );
        }

        LocalDateTime now = LocalDateTime.now();

        application.setStatus(ApplicationStatus.SUBMITTED);
        application.setSubmittedAt(now);
        application.setExpiresAt(now.plusDays(EXPIRATION_DAYS));

        Application saved = applicationRepository.save(application);

        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public ApplicationResponse getApplication(Long applicationId) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ApplicationConflictException("Application not found."));

        return toResponse(application);
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> listByCompany(Long companyId) {

        return applicationRepository.findAll()
                .stream()
                .filter(a -> a.getCompany().getId().equals(companyId))
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> listByLead(Long companyId, Long leadId) {

        return applicationRepository
                .findAllByCompanyIdAndLeadIdOrderByCreatedAtDesc(companyId, leadId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ApplicationResponse> listByStatus(
            Long companyId,
            ApplicationStatus status
    ) {

        return applicationRepository
                .findAllByCompanyIdAndStatusOrderByCreatedAtDesc(companyId, status)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ApplicationResponse updateStatus(
            Long applicationId,
            ApplicationStatus newStatus
    ) {

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ApplicationConflictException("Application not found."));

        ApplicationStatus currentStatus = application.getStatus();

        if (newStatus == ApplicationStatus.SUBMITTED) {
            throw new ApplicationConflictException(
                    "Use submitApplication to move an application to SUBMITTED."
            );
        }

        if (!isValidTransition(currentStatus, newStatus)) {
            throw new ApplicationConflictException(
                    "Invalid application status transition: "
                            + currentStatus + " -> " + newStatus
            );
        }

        application.setStatus(newStatus);

        Application saved = applicationRepository.save(application);

        return toResponse(saved);
    }

    private boolean isValidTransition(
            ApplicationStatus from,
            ApplicationStatus to
    ) {

        return switch (from) {
            case DRAFT -> to == ApplicationStatus.WITHDRAWN;
            case SUBMITTED -> to == ApplicationStatus.UNDER_REVIEW
                    || to == ApplicationStatus.WITHDRAWN;
            case UNDER_REVIEW -> to == ApplicationStatus.SCREENING
                    || to == ApplicationStatus.WITHDRAWN;
            case SCREENING -> to == ApplicationStatus.APPROVED
                    || to == ApplicationStatus.CONDITIONALLY_APPROVED
                    || to == ApplicationStatus.DECLINED
                    || to == ApplicationStatus.WITHDRAWN;
            case APPROVED,
                 CONDITIONALLY_APPROVED,
                 DECLINED,
                 WITHDRAWN,
                 EXPIRED -> false;
        };
    }

    private ApplicationResponse toResponse(Application application) {

        Long unitTypeId = application.getUnitType() != null
                ? application.getUnitType().getId()
                : null;

        Long showingId = application.getShowing() != null
                ? application.getShowing().getId()
                : null;

        return new ApplicationResponse(
                application.getId(),
                application.getApplicationNumber(),
                application.getLead().getId(),
                application.getProperty().getId(),
                application.getUnit().getId(),
                unitTypeId,
                showingId,
                application.getStatus(),
                application.getSubmittedAt(),
                application.getExpiresAt(),
                application.getCreatedAt(),
                application.getUpdatedAt()
        );
    }
}