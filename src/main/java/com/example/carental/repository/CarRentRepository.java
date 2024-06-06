package com.example.carental.repository;

import com.example.carental.model.CarRent;
import org.hibernate.id.IntegralDataTypeHolder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRentRepository extends JpaRepository<CarRent, Integer> {

    List<CarRent> findByCustomer_Id(Integer userId);

}
