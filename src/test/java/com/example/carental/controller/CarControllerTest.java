package com.example.carental.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import com.example.carental.model.Car;
import com.example.carental.model.dto.CarDto;
import com.example.carental.service.CarService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import java.util.Arrays;
import java.util.Optional;

@SpringBootTest
@AutoConfigureMockMvc
public class CarControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CarService carService;

    @BeforeEach
    public void setUp() {
        when(carService.getAllCars()).thenReturn(Arrays.asList(new Car(), new Car()));
        when(carService.getCarByID(1)).thenReturn(Optional.of(new Car()));
        when(carService.createCar(any(CarDto.class))).thenReturn(new Car());
        when(carService.deleteCar(1)).thenReturn(true);
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    public void testGetAllCars() throws Exception {
        mockMvc.perform(get("/api/car")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    public void testGetCarByID() throws Exception {
        mockMvc.perform(get("/api/car/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    public void testCreateCar() throws Exception {
        mockMvc.perform(post("/api/car")
                        .content("{}")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    public void testDeleteCar() throws Exception {
        mockMvc.perform(delete("/api/car/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
