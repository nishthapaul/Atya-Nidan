package com.atyanidan.service;

import com.atyanidan.dao.AbhaRepository;
import com.atyanidan.dao.PatientRepository;
import com.atyanidan.entity.mysql.Abha;
import com.atyanidan.entity.mysql.Demographic;
import com.atyanidan.entity.mysql.Patient;
import com.atyanidan.exception.NotFoundException;
import com.atyanidan.response.PatientDemographicDetailsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AbhaServiceImpl implements AbhaService {
    private final AbhaRepository abhaRepository;

    private final PatientRepository patientRepository;

    @Autowired
    public AbhaServiceImpl(AbhaRepository abhaRepository, PatientRepository patientRepository) {
        this.abhaRepository = abhaRepository;
        this.patientRepository = patientRepository;
    }

    public Abha getAbhaByAbhaNumber(String abhaNumber) {
        Abha abhaDetails = abhaRepository.findByAbhaNumber(abhaNumber);
        if ( abhaDetails == null ) {
            throw new NotFoundException("Abha Details do not exist.");
        }
        return abhaDetails;
    }

    @Override
    public PatientDemographicDetailsResponse getPatientDemographicDetails(String abhaNumber) {
        Patient patient = patientRepository.findByAbhaNumber(abhaNumber);
        if ( patient == null ) {
            throw new NotFoundException("Patient doesn't exist.");
        }
        System.out.println("patient: " + patient);
        String patientNumber = patient.getPatientNumber();
        Demographic demographicDetails = patient.getDemographic();

        return new PatientDemographicDetailsResponse(patientNumber, demographicDetails);
    }
}
