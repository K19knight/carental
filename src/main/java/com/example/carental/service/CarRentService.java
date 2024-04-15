package com.example.carental.service;

import com.example.carental.repository.CarRentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarRentService {

    @Autowired
    private CarRentRepository carRentRepository;


}
