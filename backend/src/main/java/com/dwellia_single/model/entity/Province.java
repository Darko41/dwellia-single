package com.dwellia_single.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(
        name = "provinces",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_province_name", columnNames = "name"),
                @UniqueConstraint(name = "uk_province_code", columnNames = "code")
        }
)
public class Province {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 2)
    private String code;
}