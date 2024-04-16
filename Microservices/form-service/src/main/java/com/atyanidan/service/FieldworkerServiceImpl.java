package com.atyanidan.service;

import com.atyanidan.dao.FieldWorkerRepository;
import com.atyanidan.entity.mysql.FieldWorker;
import com.atyanidan.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FieldworkerServiceImpl implements FieldworkerService {
    private final FieldWorkerRepository fieldWorkerRepository;

    @Autowired
    public FieldworkerServiceImpl(FieldWorkerRepository fieldWorkerRepository) {
        this.fieldWorkerRepository = fieldWorkerRepository;
    }

    public FieldWorker getFieldWorkerById(int fieldWorkerId) {
        Optional<FieldWorker> fieldWorkerById = fieldWorkerRepository.findById(fieldWorkerId);
        if ( fieldWorkerById.isEmpty() ) {
            throw new NotFoundException("Field Worker doesn't exist.");
        }
        return fieldWorkerById.get();
    }
}
