package com.atyanidan.healthhub.service;

import com.atyanidan.healthhub.dao.DistrictRepository;
import com.atyanidan.healthhub.entity.District;
import com.atyanidan.healthhub.entity.Taluka;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
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
        List<Taluka> talukas = district.getTalukas();
        Comparator<Taluka> talukaNameComparator = new Comparator<>() {
            @Override
            public int compare(Taluka t1, Taluka t2) {
                return t1.getName().compareTo(t2.getName());
            }
        };
        talukas.sort(talukaNameComparator);
        return talukas;
    }
}
