package com.example.carental.service;

import com.example.carental.model.Car;
import com.example.carental.model.dto.CarDto;
import com.example.carental.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private MarkService markService;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }


    public Optional<Car> getCarByID(Integer carId) {
        return carRepository.findById(carId);
    }

    public Car createCar(CarDto carDto) {
        Car car = Car.builder()
                .mark(markService.getMarkByName(carDto.getMark()))
                .year(carDto.getYear())
                .engine(carDto.getEngine())
                .dayPrice(carDto.getDayPrice())
                .fuelType(carDto.getFuelType())
                .build();
        return carRepository.save(car);
    }

    public boolean deleteCar(Integer id) {
        if (carRepository.findById(id).isPresent()) {
            carRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
