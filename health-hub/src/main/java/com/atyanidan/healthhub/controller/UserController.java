package com.atyanidan.healthhub.controller;

import com.atyanidan.healthhub.entity.actor.User;
import com.atyanidan.healthhub.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/atyanidan")
@Tag(name = "User", description = "API for handling functionalities of all types of users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(summary = "Retrieve user",
            description = "Retrieve a user given the user's phone number")
    @ApiResponses({
            @ApiResponse(responseCode = "200", content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = User.class)) }),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content)
    })
    @GetMapping("/users/{phoneNumber}")
    public User getUserFromPhoneNumber(@Parameter(
            name = "phoneNumber",
            description = "Phone number of user to be retrieved",
            required = true)
            @PathVariable String phoneNumber) {
        return userService.getUserFromPhoneNumber(phoneNumber);
    }
}
