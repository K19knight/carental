package com.example.carental.controller;

import com.example.carental.model.User;
import com.example.carental.model.dto.UserDto;
import com.example.carental.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Optional<User>> getUserByID(@PathVariable Integer userId){
        Optional<User> user = userService.getUserByID(userId);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{userId}")
    @ResponseBody
    public boolean deleteUserByID(@PathVariable Integer userId){
        return userService.deleteUser(userId);
    }

}
