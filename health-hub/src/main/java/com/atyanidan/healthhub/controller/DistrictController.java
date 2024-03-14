package com.atyanidan.healthhub.controller;

import com.atyanidan.healthhub.entity.Taluka;
import com.atyanidan.healthhub.entity.actor.User;
import com.atyanidan.healthhub.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/atyanidan")
public class DistrictController {
    private final DistrictService districtService;

    @Autowired
    public DistrictController(DistrictService districtService) {
        this.districtService = districtService;
    }

    @GetMapping("/districts/{districtId}/talukas")
    public List<Taluka> getTalukasFromDistrictId(@PathVariable int districtId) {
        return districtService.getTalukasFromDistrictId(districtId);
    }
}
