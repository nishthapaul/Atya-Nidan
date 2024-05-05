package com.atyanidan.dao;

import com.atyanidan.entity.FormResponse;
import com.atyanidan.entity.Patient;
import com.atyanidan.entity.Taluka;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FormResponseRepository extends JpaRepository<FormResponse, Integer> {
    Optional<FormResponse> findTopByFormFormIdAndPatientIdOrderBySubmittedOn(int formId, int patientId);

    List<FormResponse> findByPatient(Patient patient);

    FormResponse findTopByPatientOrderBySubmittedOnDesc(Patient patient);

    List<FormResponse> findAllByFieldWorkerTaluka(Taluka taluka);
}
