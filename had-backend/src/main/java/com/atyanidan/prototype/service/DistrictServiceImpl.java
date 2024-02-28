package com.atyanidan.prototype.service;

import com.atyanidan.prototype.dao.DistrictRepository;
import com.atyanidan.prototype.entity.District;
import com.atyanidan.prototype.entity.FieldWorker;
import com.atyanidan.prototype.entity.Supervisor;
import com.atyanidan.prototype.entity.Taluka;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class DistrictServiceImpl implements DistrictService {
    private final DistrictRepository districtRepository;

    @Autowired
    public DistrictServiceImpl(DistrictRepository districtRepository) {
        this.districtRepository = districtRepository;
    }

    public District findById(int districtId) {
        Optional<District> result = districtRepository.findById(districtId);
        District district = null;
        if ( result.isPresent() ) {
            district = result.get();
        } else {
            throw new RuntimeException("Did not find employee id of " + districtId);
        }
        return district;
    }

    public List<FieldWorker> findAllFieldWorkersByDistrictId(int districtId) {
        District district = findById(districtId);
        List<Taluka> talukas = district.getTalukas();
        List<FieldWorker> fieldWorkers = new ArrayList<>();
        for (Taluka taluka : talukas) {
            fieldWorkers.addAll(taluka.getFieldWorkers());
        }
        return fieldWorkers;
    }
}
