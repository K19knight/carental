package com.example.carental.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.example.carental.model.User;
import com.example.carental.service.UserService;
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
public class UserControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @BeforeEach
    public void setUp() {
        when(userService.getAllUsers()).thenReturn(Arrays.asList(new User(), new User()));
        when(userService.getUserByID(1)).thenReturn(Optional.of(new User()));
        when(userService.deleteUser(1)).thenReturn(true);
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    public void testGetAllUsers() throws Exception {
        mockMvc.perform(get("/api/user")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    public void testGetUserByID() throws Exception {
        mockMvc.perform(get("/api/user/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    public void testDeleteUser() throws Exception {
        mockMvc.perform(delete("/api/user/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
