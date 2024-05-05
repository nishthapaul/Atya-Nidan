package com.atyanidan.service;

import com.atyanidan.dao.FormResponseRepository;
import com.atyanidan.entity.FormResponse;
import com.atyanidan.entity.Patient;
import com.atyanidan.entity.Taluka;
import com.atyanidan.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FormResponseServiceImpl implements FormResponseService {
    private final FormResponseRepository formResponseRepository;

    @Autowired
    public FormResponseServiceImpl(FormResponseRepository formResponseRepository) {
        this.formResponseRepository = formResponseRepository;
    }

    @Override
    public FormResponse findLatestByFormIdAndPatientId(int formId, int patientId, String formTitle) {
        Optional<FormResponse> optional = formResponseRepository.findTopByFormFormIdAndPatientIdOrderBySubmittedOn(formId, patientId);
        if (optional.isEmpty()) {
            throw new NotFoundException("There was no form for " + formTitle + " submitted for this person.");
        }
        return optional.get();
    }

    @Override
    public List<FormResponse> findByPatient(Patient patient) {
        return formResponseRepository.findByPatient(patient);
    }

    @Override
    public FormResponse findTopByPatientOrderBySubmittedOnDesc(Patient patient) {
        return formResponseRepository.findTopByPatientOrderBySubmittedOnDesc(patient);
    }

    @Override
    public List<FormResponse> findAllByFieldWorkerTaluka(Taluka taluka) {
        return formResponseRepository.findAllByFieldWorkerTaluka(taluka);
    }

}
