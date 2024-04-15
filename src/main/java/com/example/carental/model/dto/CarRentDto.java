package com.example.carental.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarRentDto {

    private Integer customerId;

    private Integer carId;

    private Double price;

    private Integer term;

    private LocalDate rentDate;

}
