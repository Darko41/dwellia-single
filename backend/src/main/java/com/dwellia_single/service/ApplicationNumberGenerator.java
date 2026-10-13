package com.dwellia_single.service;

import com.dwellia_single.repository.ApplicationRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Year;

@Component
public class ApplicationNumberGenerator {

    private static final String PREFIX = "APP";
    private static final int SEQUENCE_WIDTH = 6;

    private final ApplicationRepository applicationRepository;

    public ApplicationNumberGenerator(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    @Transactional
    public String generate(Long companyId) {

        int year = Year.now().getValue();

        String prefix = PREFIX + "-" + companyId + "-" + year + "-";

        String max = applicationRepository
                .findMaxApplicationNumberForCompanyAndPrefix(companyId, prefix)
                .orElse(null);

        long nextSequence = 1L;

        if (max != null) {
            String sequencePart = max.substring(prefix.length());
            nextSequence = Long.parseLong(sequencePart) + 1L;
        }

        String sequence = String.format(
                "%0" + SEQUENCE_WIDTH + "d",
                nextSequence
        );

        return prefix + sequence;
    }
}