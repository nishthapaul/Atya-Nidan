package com.atyanidan.healthhub.service;

import com.atyanidan.healthhub.dao.DoctorRepository;
import com.atyanidan.healthhub.dao.FieldWorkerRepository;
import com.atyanidan.healthhub.dao.TalukaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;

    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }
}
