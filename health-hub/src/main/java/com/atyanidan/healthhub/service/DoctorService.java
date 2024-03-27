package com.atyanidan.healthhub.service;

import com.atyanidan.healthhub.entity.actor.Doctor;

import java.util.List;

public interface DoctorService {
    List<Doctor> getDoctorsFromDistrictId(int districtId);

    Doctor addDoctor(int talukaId, Doctor doctor) throws Exception;
}
