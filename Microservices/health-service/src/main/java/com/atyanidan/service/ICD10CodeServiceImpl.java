package com.atyanidan.service;

import com.atyanidan.dao.ICDCodeRepository;
import com.atyanidan.entity.ICDCode;
import com.atyanidan.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ICD10CodeServiceImpl implements ICD10CodeService {
    private final ICDCodeRepository icdCodeRepository;

    @Autowired
    public ICD10CodeServiceImpl(ICDCodeRepository icdCodeRepository) {
        this.icdCodeRepository = icdCodeRepository;
    }

    @Override
    public ICDCode findByCode(String icd10Code) {
        Optional<ICDCode> optional = icdCodeRepository.findByCode(icd10Code);
        if ( optional.isEmpty() ) {
            throw new NotFoundException("ICD10 Code doesn't exist");
        }
        return optional.get();
    }

    @Override
    public List<ICDCode> findAllICDCodes() {
        return icdCodeRepository.findAll();
    }
}
