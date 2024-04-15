package com.example.carental.controller;

import com.example.carental.service.CarRentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "rent")
public class CarRentController {

    @Autowired
    private CarRentService carRentService;

}
