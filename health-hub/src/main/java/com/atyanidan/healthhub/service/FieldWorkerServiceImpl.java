package com.atyanidan.healthhub.service;

import com.atyanidan.healthhub.dao.FieldWorkerRepository;
import com.atyanidan.healthhub.dao.TalukaRepository;
import com.atyanidan.healthhub.entity.Taluka;
import com.atyanidan.healthhub.entity.actor.FieldWorker;
import com.atyanidan.healthhub.exception.ConflictException;
import com.atyanidan.healthhub.exception.NotFoundException;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class FieldWorkerServiceImpl implements FieldWorkerService {

    private final FieldWorkerRepository fieldWorkerRepository;
    private final TalukaRepository talukaRepository;

    @Autowired
    public FieldWorkerServiceImpl(FieldWorkerRepository fieldWorkerRepository, TalukaRepository talukaRepository) {
        this.fieldWorkerRepository = fieldWorkerRepository;
        this.talukaRepository = talukaRepository;
    }

    @Override
    public List<FieldWorker> getFieldWorkersFromTalukaId(int talukaId) {
        return fieldWorkerRepository.getFieldWorkersByTalukaId(talukaId);
    }

    @Override
    public List<FieldWorker> getFieldWorkersFromDistrictId(int districtId) {
        List<FieldWorker> fieldWorkers = new ArrayList<>();
        List<Taluka> talukasByDistrictId = talukaRepository.getTalukasByDistrictId(districtId);
        for (Taluka taluka : talukasByDistrictId) {
            fieldWorkers.addAll(fieldWorkerRepository.getFieldWorkersByTalukaId(taluka.getId()));
        }
        Comparator<FieldWorker> fieldWorkerFirstNameComparator = new Comparator<>() {
            @Override
            public int compare(FieldWorker f1, FieldWorker f2) {
                return f1.getFirstName().compareTo(f2.getFirstName());
            }
        };
        fieldWorkers.sort(fieldWorkerFirstNameComparator);
        return fieldWorkers;
    }

    @Override
    public FieldWorker addFieldWorker(int talukaId, FieldWorker fieldWorker) throws Exception {
        Optional<Taluka> optionalEntity = talukaRepository.findById(talukaId);
        if (optionalEntity.isPresent()) {
            Taluka taluka = optionalEntity.get();
            fieldWorker.setTaluka(taluka);
            try {
                return fieldWorkerRepository.save(fieldWorker);
            } catch (DataIntegrityViolationException e) {
                if (e.getMessage().contains("Duplicate entry")) {
                    String errorMessage = "Phone number or email already exists.";
                    throw new ConflictException(errorMessage, e);
                } else {
                    throw new BadRequestException("Some fields are required and not provided.", e);
                }
            } catch (Exception e) {
                throw new Exception(e.getMessage());
            }
        } else {
            throw new NotFoundException("Taluka id not found: " + talukaId);
        }
    }
}
