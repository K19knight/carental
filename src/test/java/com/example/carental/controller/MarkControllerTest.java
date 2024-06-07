package com.example.carental.controller;


import com.example.carental.model.Mark;
import com.example.carental.model.dto.MarkDto;
import com.example.carental.service.MarkService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
public class MarkControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MarkService markService;


    @BeforeEach
    public void setUp() {
        when(markService.getAllMarks()).thenReturn(Arrays.asList(new Mark(), new Mark()));
        when(markService.getMarkByID(1)).thenReturn(Optional.of(new Mark()));
        when(markService.createMark(new MarkDto())).thenReturn(new Mark());
        when(markService.deleteMark(1)).thenReturn(true);
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    public void testGetAllMarks() throws Exception {
        // Checks if status code is 200
        mockMvc.perform(MockMvcRequestBuilders.get("/api/mark")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
        assertNotNull(markService.getAllMarks());
        assertFalse(markService.getAllMarks().isEmpty());
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    public void testGetMarkByID() throws Exception {
        // Checks if status code is 200
        mockMvc.perform(MockMvcRequestBuilders.get("/api/mark/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
        assertNotNull(markService.getMarkByID(1));
        assertTrue(markService.getMarkByID(1).isPresent());
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    public void testCreateMark() throws Exception {
        // Checks if status code is 201
        mockMvc.perform(MockMvcRequestBuilders.post("/api/mark")
                        .content("{}")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @WithMockUser(username = "user", roles = "USER")
    public void testDeleteMark() throws Exception {
        // Checks if status code is 200
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/mark/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

}
