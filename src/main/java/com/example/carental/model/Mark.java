package com.example.carental.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Mark {

    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue( strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private String name;
}
