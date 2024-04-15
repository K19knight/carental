package com.example.carental.repository;

import com.example.carental.model.Mark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarkRepository extends JpaRepository<Mark, Integer> {

    Mark findByName(String name);
}
