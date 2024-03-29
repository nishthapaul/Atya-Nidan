package com.atyanidan.healthhub.service;

import com.atyanidan.healthhub.dao.TalukaRepository;
import com.atyanidan.healthhub.entity.Taluka;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class TalukaServiceImpl implements TalukaService {

    private final TalukaRepository talukaRepository;

    @Autowired
    public TalukaServiceImpl(TalukaRepository talukaRepository) {
        this.talukaRepository = talukaRepository;
    }

    @Override
    public List<Taluka> getTalukasFromDistrictId(int districtId) {
        List<Taluka> talukas = talukaRepository.getTalukasByDistrictId(districtId, Sort.by(Sort.Direction.ASC, "name"));
        return talukas;
    }
}
