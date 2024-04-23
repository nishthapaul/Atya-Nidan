package com.atyanidan.service;

import com.atyanidan.dao.TalukaRepository;
import com.atyanidan.entity.Taluka;
import com.atyanidan.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public Taluka findByTalukaId(int talukaId) {
        Optional<Taluka> optionalTaluka = talukaRepository.findById(talukaId);
        if ( optionalTaluka.isEmpty() ) {
            throw new NotFoundException("Taluka id not found: " + talukaId);
        }
        return optionalTaluka.get();
    }

}
