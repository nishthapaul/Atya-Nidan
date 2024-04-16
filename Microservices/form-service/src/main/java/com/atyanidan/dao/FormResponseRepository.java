package com.atyanidan.dao;

import com.atyanidan.entity.mysql.FormResponse;
import com.atyanidan.entity.mysql.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FormResponseRepository extends JpaRepository<FormResponse, Integer> {
    List<FormResponse> findByPatient(Patient patient);
}
