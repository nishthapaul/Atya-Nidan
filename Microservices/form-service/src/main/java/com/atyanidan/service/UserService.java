package com.atyanidan.service;


import com.atyanidan.entity.mysql.User;

public interface UserService {

    User getUserFromEmployeeId(String employeeId);
}
