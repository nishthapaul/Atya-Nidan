package com.atyanidan.service;

import com.atyanidan.dao.FieldWorkerRepository;
import com.atyanidan.dao.TalukaRepository;
import com.atyanidan.entity.Role;
import com.atyanidan.entity.Taluka;
import com.atyanidan.entity.actor.FieldWorker;
import com.atyanidan.exception.ConflictException;
import com.atyanidan.exception.NotFoundException;
import com.atyanidan.model.requestbody.FieldWorkerAvailabilityRequest;
import com.atyanidan.utils.EmployeeIdGenerator;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class FieldWorkerServiceImpl implements FieldWorkerService {

    private final FieldWorkerRepository fieldWorkerRepository;
    private final TalukaRepository talukaRepository;
    private final EmployeeIdGenerator employeeIdGenerator;

    @Autowired
    public FieldWorkerServiceImpl(FieldWorkerRepository fieldWorkerRepository, TalukaRepository talukaRepository, EmployeeIdGenerator employeeIdGenerator) {
        this.fieldWorkerRepository = fieldWorkerRepository;
        this.talukaRepository = talukaRepository;
        this.employeeIdGenerator = employeeIdGenerator;
    }

    @Override
    public List<FieldWorker> getFieldWorkersByTalukaIdAndAvailable(int talukaId, Boolean available) {
        return fieldWorkerRepository.findByTalukaIdAndAvailable(talukaId, available, Sort.by(Sort.Direction.ASC, "firstName"));
    }

    @Override
    public List<FieldWorker> getFieldWorkersByTalukaId(int talukaId) {
        return fieldWorkerRepository.findByTalukaId(talukaId);
    }

    @Override
    public List<FieldWorker> getFieldWorkersFromDistrictId(int districtId) {
        List<FieldWorker> fieldWorkers = new ArrayList<>();
        List<Taluka> talukasByDistrictId = talukaRepository.getTalukasByDistrictId(districtId, Sort.by(Sort.Direction.ASC, "name"));
        for (Taluka taluka : talukasByDistrictId) {
            fieldWorkers.addAll(fieldWorkerRepository.findByTalukaId(taluka.getId()));
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
    public List<FieldWorker> getFieldWorkersFromDistrictIdV2(int districtId) {
        return fieldWorkerRepository.getFieldWorkersByDistrictId(districtId);
    }

    @Override
    public FieldWorker addFieldWorker(int talukaId, FieldWorker fieldWorker) throws Exception {
        if (fieldWorker.getRole() != Role.FieldWorker) {
            throw new BadRequestException("Role should be FieldWorker");
        }
        if (fieldWorker.getTaluka().getId() != talukaId) {
            throw new BadRequestException("Taluka Id in API and Response Body don't match");
        }
        Optional<Taluka> optionalEntity = talukaRepository.findById(talukaId);
        if (optionalEntity.isPresent()) {
            Taluka taluka = optionalEntity.get();
            fieldWorker.setTaluka(taluka);
            try {
                FieldWorker dbFieldWorker = fieldWorkerRepository.save(fieldWorker);
                String employeeID = employeeIdGenerator.generate("FW", fieldWorker.getId(), fieldWorker.getFirstName());
                dbFieldWorker.setEmpId(employeeID);
                dbFieldWorker = fieldWorkerRepository.save(dbFieldWorker);
                return dbFieldWorker;
            } catch (DataIntegrityViolationException e) {
                String exceptionRootCause = e.getRootCause().getMessage();
                if ( exceptionRootCause.contains("Duplicate entry") && exceptionRootCause.contains("phone_number") ) {
                    String errorMessage = "Phone number already exists.";
                    throw new ConflictException(errorMessage, e);
                } else if ( exceptionRootCause.contains("Duplicate entry") && exceptionRootCause.contains("email") ) {
                    String errorMessage = "Email ID already exists.";
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

    @Override
    public FieldWorker updateAvailability(int fieldWorkerId, FieldWorkerAvailabilityRequest requestBody) {
        FieldWorker fieldWorker = getFieldWorkerById(fieldWorkerId);
        fieldWorker.setAvailable(requestBody.getAvailable());
        if ( requestBody.getAvailable() ) {
            fieldWorker.setSubstitute(null);
        } else {
            FieldWorker substituteFieldWorker = getFieldWorkerById(requestBody.getSubstituteFieldWorkerId());
            substituteFieldWorker.setAvailable(true);
            fieldWorker.setSubstitute(substituteFieldWorker);
        }
        return fieldWorkerRepository.save(fieldWorker);
    }

    private FieldWorker getFieldWorkerById(int fieldWorkerId) throws NotFoundException {
        Optional<FieldWorker> optionalFieldWorkerId = fieldWorkerRepository.findById(fieldWorkerId);
        if ( optionalFieldWorkerId.isEmpty() ) {
            throw new NotFoundException("Field Worker id not found: " + fieldWorkerId);
        }
        return optionalFieldWorkerId.get();
    }
}
