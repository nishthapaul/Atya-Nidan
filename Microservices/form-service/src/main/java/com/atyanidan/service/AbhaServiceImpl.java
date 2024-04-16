package com.atyanidan.service;

import com.atyanidan.dao.AbhaRepository;
import com.atyanidan.dao.FieldWorkerRepository;
import com.atyanidan.entity.mysql.Abha;
import com.atyanidan.entity.mysql.FieldWorker;
import com.atyanidan.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AbhaServiceImpl implements AbhaService {
    private final AbhaRepository abhaRepository;

    @Autowired
    public AbhaServiceImpl(AbhaRepository abhaRepository) {
        this.abhaRepository = abhaRepository;
    }

    public Abha getAbhaByAbhaNumber(String abhaNumber) {
        Abha abhaDetails = abhaRepository.findByAbhaNumber(abhaNumber);
        if ( abhaDetails == null ) {
            throw new NotFoundException("Abha Details do not exist.");
        }
        return abhaDetails;
    }
}
