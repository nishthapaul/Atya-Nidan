package com.atyanidan.healthhub.service;

import com.atyanidan.healthhub.dao.DoctorRepository;
import com.atyanidan.healthhub.entity.actor.Doctor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;

    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @Override
    public List<Doctor> getDoctorsFromDistrictId(int districtId, int offset, int pageSize) {
        return doctorRepository.getDoctorsFromDistrictId(districtId, PageRequest.of(offset, pageSize, Sort.by("firstName").ascending()));
    }
}
