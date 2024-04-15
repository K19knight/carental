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
public class CarRent {

    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue( strategy = GenerationType.AUTO)
    private Integer id;

    @ManyToOne
    @JoinColumn(nullable = false)
    private User customer;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Car car;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer term;

    @Column(nullable = false)
    private LocalDate rentDate;

}
