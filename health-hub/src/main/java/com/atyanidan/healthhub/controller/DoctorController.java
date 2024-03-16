package com.atyanidan.healthhub.controller;

import com.atyanidan.healthhub.entity.actor.Doctor;
import com.atyanidan.healthhub.model.APIResponse;
import com.atyanidan.healthhub.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public APIResponse<List<Doctor>> getDoctorsFromDistrictId(@PathVariable int districtId, @RequestParam("offset") int offset, @RequestParam("pageSize") int pageSize) {
        List<Doctor> doctorsList = doctorService.getDoctorsFromDistrictId(districtId, offset, pageSize);
        return new APIResponse<>(doctorsList.size(), doctorsList);
    }
}
