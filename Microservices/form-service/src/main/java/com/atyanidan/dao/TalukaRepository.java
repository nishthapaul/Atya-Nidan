package com.atyanidan.dao;

import com.atyanidan.entity.mysql.Taluka;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalukaRepository extends JpaRepository<Taluka, Integer> {
    Taluka findByName(String name);
}
