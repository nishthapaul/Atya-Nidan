package com.atyanidan.healthhub.controller;

import com.atyanidan.healthhub.entity.actor.Doctor;
import com.atyanidan.healthhub.model.APIResponse;
import com.atyanidan.healthhub.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/atyanidan")
public class DoctorController {
    private final DoctorService doctorService;

    @Autowired
    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping("/districts/{districtId}/doctors")
    public List<Doctor> getDoctorsFromDistrictId(@PathVariable int districtId) {
        return doctorService.getDoctorsFromDistrictId(districtId);
    }

    @PostMapping("/talukas/{talukaId}/doctors")
    public ResponseEntity<Doctor> addDoctor(@PathVariable int talukaId, @RequestBody Doctor doctor) throws Exception {
        System.out.println(doctor);
        Doctor dbDoctor = doctorService.addDoctor(talukaId, doctor);
        return ResponseEntity.status(HttpStatus.CREATED).body(dbDoctor);
    }
}
