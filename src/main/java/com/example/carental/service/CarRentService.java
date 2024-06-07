package com.example.carental.service;

import com.example.carental.model.Car;
import com.example.carental.model.CarRent;
import com.example.carental.model.User;
import com.example.carental.model.dto.CarRentDto;
import com.example.carental.repository.CarRentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarRentService {

    @Autowired
    private CarRentRepository carRentRepository;

    @Autowired
    private CarService carService;

    @Autowired
    private UserService userService;


    public CarRent rentCar(CarRentDto dto) {

        Optional<Car> car = carService.getCarByID(dto.getCarId());
        Optional<User> user = userService.getUserByID(dto.getCustomerId());
        CarRent carRent = null;

        if (car.isPresent() && user.isPresent()) {
            Car car1 = car.get();
            User user1 = user.get();
            carRent = CarRent.builder()
                    .car(car1)
                    .customer(user1)
                    .price(dto.getPrice())
                    .term(dto.getTerm())
                    .rentDate(dto.getRentDate())
                    .build();

        }
        return carRentRepository.save(carRent);
    }

    public List<CarRent> getAllCarRents() {
        return carRentRepository.findAll();
    }

    public List<CarRent> getMyCarRents(Integer userId) {
        return carRentRepository.findByCustomer_Id(userId);
    }
}
