package com.atyanidan.service;

import com.atyanidan.dao.PatientRepository;
import com.atyanidan.entity.Patient;
import com.atyanidan.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService {
    private final PatientRepository patientRepository;

    @Autowired
    public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    @Override
    public Patient findByPatientNumber(String patientNumber) {
        Optional<Patient> optional = patientRepository.findByPatientNumber(patientNumber);
        if ( optional.isEmpty() ) {
            throw new NotFoundException("Patient doesn't exist");
        }
        return optional.get();
    }
}
