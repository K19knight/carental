package com.example.carental.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Car {


    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue( strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Mark mark;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private LocalDate year;

    @Column(nullable = false)
    private Double engine;

    @Column(nullable = false)
    private String fuelType;

    @Column(nullable = false)
    private Double dayPrice;

}
