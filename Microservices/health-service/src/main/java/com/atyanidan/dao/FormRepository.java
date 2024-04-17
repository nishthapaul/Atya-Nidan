package com.atyanidan.dao;

import com.atyanidan.entity.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FormRepository extends JpaRepository<Form, Integer> {
    Optional<Form> findByTitle(String title);
}
