package com.atyanidan.dao;

import com.atyanidan.entity.Patient;
import com.atyanidan.entity.PrescriptionResponse;
import com.atyanidan.entity.actor.Doctor;
import com.atyanidan.entity.actor.FieldWorker;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrescriptionResponseRepository extends JpaRepository<PrescriptionResponse, Integer> {
    List<PrescriptionResponse> findByPatient(Patient patient);
    List<PrescriptionResponse> findByDoctor(Doctor doctor, Sort sort);
    List<PrescriptionResponse> findByFieldWorkerAndFollowUpCompleteIsFalse(FieldWorker fieldWorker);
}
