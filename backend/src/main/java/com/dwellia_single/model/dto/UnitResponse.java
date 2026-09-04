package com.dwellia_single.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class UnitResponse {

    private Long id;

    private String unitNumber;

    private BigDecimal rent;

    private String status;

    private Integer squareFeet;

    private LocalDate availabilityDate;

    private Long propertyId;

    private String propertyName;

    private String cityName;

    private Long unitTypeId;

    private String unitTypeName;

    private int bedrooms;

    private BigDecimal bathrooms;
}
