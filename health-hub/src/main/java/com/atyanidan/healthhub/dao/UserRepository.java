package com.atyanidan.healthhub.dao;

import com.atyanidan.healthhub.entity.actor.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    public User findByPhoneNumber(String phoneNumber);
}
