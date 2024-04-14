package com.atyanidan.dao;

import com.atyanidan.entity.mysql.Form;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormRepository extends JpaRepository<Form, Integer> {
}
