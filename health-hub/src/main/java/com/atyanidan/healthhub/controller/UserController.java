package com.atyanidan.healthhub.controller;

import com.atyanidan.healthhub.entity.actor.User;
import com.atyanidan.healthhub.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/atyanidan")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/{phoneNumber}")
    public User getUserFromPhoneNumber(@PathVariable String phoneNumber) {
        return userService.getUserFromPhoneNumber(phoneNumber);
    }
}
