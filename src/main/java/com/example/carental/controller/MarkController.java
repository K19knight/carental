package com.example.carental.controller;

import com.example.carental.model.Mark;
import com.example.carental.model.dto.MarkDto;
import com.example.carental.service.MarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "mark")
public class MarkController {

    @Autowired
    private MarkService markService;

    @GetMapping
    public ResponseEntity<List<Mark>> getAllMarks(){
        List<Mark> marks = markService.getAllMarks();
        return ResponseEntity.ok(marks);
    }

    @GetMapping("/{markId}")
    public ResponseEntity<Optional<Mark>> getUserByID(@PathVariable Integer markId){
        Optional<Mark> mark = markService.getMarkByID(markId);
        return ResponseEntity.ok(mark);
    }

    @PostMapping
    public ResponseEntity<Mark> createUser(@RequestBody MarkDto newMark){
        Mark mark = markService.createMark(newMark);
        return new ResponseEntity<>(mark, HttpStatus.CREATED);
    }

    @DeleteMapping("/{markId}")
    @ResponseBody
    public boolean deleteUserByID(@PathVariable Integer markId){
        return markService.deleteMark(markId);
    }

}
