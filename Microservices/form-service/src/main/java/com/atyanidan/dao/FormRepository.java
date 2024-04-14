package com.atyanidan.dao;

import com.atyanidan.entity.mysql.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FormRepository extends JpaRepository<Form, Integer> {
    @Query("SELECT COUNT(*) FROM Form f WHERE f.title = :title")
    int countByTitle(String title);
}
