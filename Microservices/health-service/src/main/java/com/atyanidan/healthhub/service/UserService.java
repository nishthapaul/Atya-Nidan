package com.atyanidan.healthhub.service;

import com.atyanidan.healthhub.entity.actor.User;

public interface UserService {

    User getUserFromPhoneNumber(String phoneNumber);
}
