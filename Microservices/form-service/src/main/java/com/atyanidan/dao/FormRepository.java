package com.atyanidan.dao;

import com.atyanidan.entity.mysql.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FormRepository extends JpaRepository<Form, Integer> {
    @Query("SELECT COUNT(*) FROM Form f WHERE f.title = :title")
    int countByTitle(String title);

    List<Form> findAllByOrderBySelectedDescTitleAsc();

    @Query("SELECT f FROM Form f WHERE f.selected = true")
    Form getSelectedForm();
}
