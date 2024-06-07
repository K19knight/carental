package com.example.carental.controller;

import com.example.carental.model.CarRent;
import com.example.carental.model.dto.CarRentDto;
import com.example.carental.service.CarRentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/rent")
public class CarRentController {

    @Autowired
    private CarRentService carRentService;

    @PostMapping
    public ResponseEntity<CarRent> rentCar(@RequestBody CarRentDto dto) {
        CarRent carRent = carRentService.rentCar(dto);
        return ResponseEntity.ok(carRent);
    }

    @GetMapping
    public ResponseEntity<List<CarRent>> getAllCarRents() {
        List<CarRent> carRents = carRentService.getAllCarRents();
        return ResponseEntity.ok(carRents);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<CarRent>> getMyRents(@PathVariable Integer userId) {
        List<CarRent> carRents = carRentService.getMyCarRents(userId);
        return ResponseEntity.ok(carRents);
    }

}
