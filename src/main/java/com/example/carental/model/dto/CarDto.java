
package com.example.carental.model.dto;

import com.example.carental.model.Mark;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarDto {

    private String mark;
    private String model;
    private Integer year;
    private Double engine;
    private String fuelType;
    private Double dayPrice;
}
