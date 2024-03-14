package com.atyanidan.healthhub.controller;

import com.atyanidan.healthhub.entity.Taluka;
import com.atyanidan.healthhub.service.TalukaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/atyanidan")
public class TalukaController {
    private final TalukaService talukaService;

    @Autowired
    public TalukaController(TalukaService talukaService) {
        this.talukaService = talukaService;
    }

    @GetMapping("/districts/{districtId}/talukas")
    public List<Taluka> getTalukasFromDistrictId(@PathVariable int districtId) {
        return talukaService.getTalukasFromDistrictId(districtId);
    }
}
