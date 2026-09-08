package com.dwellia_single.model.dto.lead;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LeadResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
}
