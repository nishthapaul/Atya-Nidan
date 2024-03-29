package com.atyanidan.service;

import com.atyanidan.entity.actor.Doctor;

import java.util.List;

public interface DoctorService {
    List<Doctor> getDoctorsFromDistrictId(int districtId);

    Doctor addDoctor(int talukaId, Doctor doctor) throws Exception;
}
