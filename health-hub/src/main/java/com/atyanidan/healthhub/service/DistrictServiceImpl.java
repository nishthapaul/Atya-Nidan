package com.atyanidan.healthhub.service;

import com.atyanidan.healthhub.dao.DistrictRepository;
import com.atyanidan.healthhub.entity.District;
import com.atyanidan.healthhub.entity.Taluka;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DistrictServiceImpl implements DistrictService {

    private final DistrictRepository districtRepository;

    @Autowired
    public DistrictServiceImpl(DistrictRepository districtRepository) {
        this.districtRepository = districtRepository;
    }

    @Override
    public List<Taluka> getTalukasFromDistrictId(int districtId) {
        District district = districtRepository.findById(districtId).get();
        return district.getTalukas();
    }
}
