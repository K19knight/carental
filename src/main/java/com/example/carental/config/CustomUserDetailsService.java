package com.example.carental.config;

import com.example.carental.model.User;
import com.example.carental.service.UserService;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@NoArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private CustomUserDetails customUserDetails;

    @Autowired
    private UserService userService;

    @Override
    public CustomUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userService.getUserByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        customUserDetails.setUser(user);
        return customUserDetails;
    }
}
