package com.example.carental.controller;

import com.example.carental.model.Car;
import com.example.carental.model.dto.CarDto;
import com.example.carental.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "car")
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping
    public ResponseEntity<List<Car>> getAllCars(){
        List<Car> cars = carService.getAllCars();
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/{carId}")
    public ResponseEntity<Optional<Car>> getUserByID(@PathVariable Integer carId){
        Optional<Car> car = carService.getCarByID(carId);
        return ResponseEntity.ok(car);
    }

    @PostMapping()
    public ResponseEntity<Car> createCar(@RequestBody CarDto newCar){
        Car car = carService.createCar(newCar);
        return ResponseEntity.ok(car);
    }
    @DeleteMapping("/{carId}")
    @ResponseBody
    public boolean deleteUserByID(@PathVariable Integer carId){
        return carService.deleteCar(carId);
    }

}
