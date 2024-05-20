package com.example.carental.service;

import com.example.carental.model.Mark;
import com.example.carental.model.dto.MarkDto;
import com.example.carental.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarkService {

    @Autowired
    private MarkRepository markRepository;


    public List<Mark> getAllMarks() {
        return markRepository.findAll();
    }

    public Optional<Mark> getMarkByID(Integer id) {
        return markRepository.findById(id);
    }

    public Mark getMarkByName(String name) {
        return markRepository.findByName(name);
    }

    public Mark createMark(MarkDto newMark) {
        Mark mark = markRepository.findByName(newMark.getName());
        if (mark == null) {
            mark = Mark.builder().name(newMark.getName()).build();
            mark = markRepository.save(mark);
        }
        return mark;
    }

    public boolean deleteMark(Integer id) {
        if (markRepository.findById(id).isPresent()) {
            markRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
