package com.example.carental.repository;

import com.example.carental.model.Car;
import com.example.carental.model.Mark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRepository extends JpaRepository<Car, Integer> {

    Car findByMark(Mark mark);

    Car findByEngineIsGreaterThanEqual(Double engine);

    Car findByEngineIsLessThanEqual(Double engine);

    Car findByEngineIsBetween(Double min, Double max);

}
