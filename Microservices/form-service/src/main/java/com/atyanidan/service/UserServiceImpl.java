package com.atyanidan.service;

import com.atyanidan.dao.UserRepository;
import com.atyanidan.entity.mysql.User;
import com.atyanidan.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUserFromEmployeeId(String employeeId) {
        User user = userRepository.findByEmpId(employeeId);
        if (user == null) {
            throw new NotFoundException("User doesn't exist");
        }
        return user;
    }
}
