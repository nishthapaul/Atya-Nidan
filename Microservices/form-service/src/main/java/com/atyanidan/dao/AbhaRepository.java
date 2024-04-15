package com.atyanidan.dao;

import com.atyanidan.entity.mysql.Abha;
import com.atyanidan.entity.mysql.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AbhaRepository extends JpaRepository<Abha, Integer> {
    Abha findByAbhaNumber(String abhaNumber);
}
