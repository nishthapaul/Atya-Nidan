package com.atyanidan.service;

import com.atyanidan.dao.PrescriptionResponseRepository;
import com.atyanidan.entity.mysql.PrescriptionResponse;
import com.atyanidan.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PrescriptionResponseServiceImpl implements PrescriptionResponseService {
    private final PrescriptionResponseRepository prescriptionResponseRepository;

    @Autowired
    public PrescriptionResponseServiceImpl(PrescriptionResponseRepository prescriptionResponseRepository) {
        this.prescriptionResponseRepository = prescriptionResponseRepository;
    }

    @Override
    public PrescriptionResponse findLatestByFormIdAndPatientId(int formId, int patientId, String formTitle) {
        Optional<PrescriptionResponse> optional = prescriptionResponseRepository.findTopByFormFormIdAndPatientIdOrderBySubmittedOn(formId, patientId);
        if (optional.isEmpty()) {
            throw new NotFoundException("There was no form for " + formTitle + " submitted for this person.");
        }
        return optional.get();
    }

    @Override
    public PrescriptionResponse save(PrescriptionResponse prescriptionResponse) {
        return prescriptionResponseRepository.save(prescriptionResponse);
    }

}
