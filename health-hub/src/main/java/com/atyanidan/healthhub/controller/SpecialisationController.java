package com.atyanidan.healthhub.controller;

import com.atyanidan.healthhub.dao.SpecialisationRepository;
import com.atyanidan.healthhub.entity.Specialisation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/atyanidan")
public class SpecialisationController {
    private final SpecialisationRepository specialisationRepository;

    @Autowired
    public SpecialisationController(SpecialisationRepository specialisationRepository) {
        this.specialisationRepository = specialisationRepository;
    }

    @GetMapping("/specialisations")
    public List<Specialisation> getAllSpecialisations() {
        return specialisationRepository.findAll();
    }
}
