package com.atyanidan.dao;

import com.atyanidan.entity.mysql.PrescriptionResponse;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface PrescriptionResponseRepository extends JpaRepository<PrescriptionResponse, Integer> {
    Optional<PrescriptionResponse> findTopByFormFormIdAndPatientIdOrderBySubmittedOn(int formId, int patientId);
}
