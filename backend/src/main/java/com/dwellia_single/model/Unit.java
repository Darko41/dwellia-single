package com.dwellia_single.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "units")
public class Unit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private int price;

    private int bedrooms;

    private int bathrooms;

    @Enumerated(EnumType.STRING)
    private UnitStatus status;
}


