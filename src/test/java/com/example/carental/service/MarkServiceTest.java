package com.example.carental.service;

import com.example.carental.model.Mark;
import com.example.carental.model.dto.MarkDto;
import com.example.carental.repository.MarkRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
public class MarkServiceTest {

    @Autowired
    private MarkService markService;

    @MockBean
    private MarkRepository markRepository;

    @BeforeEach
    public void setUp() {
        when(markRepository.findAll()).thenReturn(Arrays.asList(new Mark(), new Mark()));
        when(markRepository.findById(1)).thenReturn(Optional.of(new Mark()));
        when(markRepository.findByName("Toyota")).thenReturn(new Mark());
        when(markRepository.findByName("Nonexistent")).thenReturn(null);
    }

    @Test
    public void testGetAllMarks() {
        List<Mark> result = markService.getAllMarks();
        assertNotNull(result);
        assertEquals(2, result.size());
    }

    @Test
    public void testGetMarkByID() {
        Optional<Mark> result = markService.getMarkByID(1);
        assertTrue(result.isPresent());
    }

    @Test
    public void testGetMarkByName() {
        Mark result = markService.getMarkByName("Toyota");
        assertNotNull(result);
    }

    @Test
    public void testCreateMark() {
        MarkDto newMarkDto = new MarkDto();
        newMarkDto.setName("Nonexistent");
        Mark savedMark = Mark.builder().name(newMarkDto.getName()).build();
        when(markRepository.findByName(newMarkDto.getName())).thenReturn(null);
        when(markRepository.save(any(Mark.class))).thenAnswer(invocation -> {
            return savedMark;
        });

        Mark result = markService.createMark(newMarkDto);

        assertNotNull(result);
        assertEquals(newMarkDto.getName(), result.getName());
    }

    @Test
    public void testDeleteMark() {
        boolean result = markService.deleteMark(1);
        assertTrue(result);
    }
}
