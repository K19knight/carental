package com.example.carental.service;

import com.example.carental.model.User;
import com.example.carental.model.dto.UserDto;
import com.example.carental.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByID(Integer id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User createUser(UserDto newUser) {
        User user = userRepository.findByEmail(newUser.getEmail());
        if (user == null) {
            user = User.builder()
                    .surname(newUser.getSurname())
                    .name(newUser.getName())
                    .password(newUser.getPassword())
                    .email(newUser.getEmail())
                    .build();
            user = userRepository.save(user);
        }
        return user;
    }

    public boolean deleteUser(Integer id) {
        if (userRepository.findById(id).isPresent()) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
