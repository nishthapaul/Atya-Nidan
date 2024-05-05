package com.atyanidan.dao;

import com.atyanidan.entity.mysql.Abha;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AbhaRepository extends JpaRepository<Abha, Integer> {
    Abha findByAbhaNumber(String abhaNumber);
}
