package com.atyanidan.prototype.rest;

import com.atyanidan.prototype.entity.District;
import com.atyanidan.prototype.entity.FieldWorker;
import com.atyanidan.prototype.entity.Taluka;
import com.atyanidan.prototype.service.DistrictService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DistrictController {
    private final DistrictService districtService;

    public DistrictController(DistrictService districtService) {
        this.districtService = districtService;
    }

    @GetMapping("/districts/{districtId}/talukas")
    public List<Taluka> getTalukasByDistrictId(@PathVariable int districtId) {
        District district = districtService.findById(districtId);
        return district.getTalukas();
    }

    @GetMapping("districts/{districtId}/fieldworkers")
    public List<FieldWorker> getFieldWorkersByDistrictId(@PathVariable int districtId) {
        List<FieldWorker> allFieldWorkersBySupervisor = districtService.findAllFieldWorkersByDistrictId(districtId);
        System.out.println(allFieldWorkersBySupervisor);
        return allFieldWorkersBySupervisor;
    }
}
