package com.example.carental.repository;

import com.example.carental.model.CarRent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarRentRepository extends JpaRepository<CarRent, Integer> {

}
