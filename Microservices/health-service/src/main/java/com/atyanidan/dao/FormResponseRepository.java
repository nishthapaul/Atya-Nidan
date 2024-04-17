package com.atyanidan.dao;

import com.atyanidan.entity.FormResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FormResponseRepository extends JpaRepository<FormResponse, Integer> {
    Optional<FormResponse> findTopByFormFormIdAndPatientIdOrderBySubmittedOn(int formId, int patientId);
}
