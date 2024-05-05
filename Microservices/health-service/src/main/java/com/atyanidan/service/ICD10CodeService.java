package com.atyanidan.service;

import com.atyanidan.entity.ICDCode;

import java.util.List;

public interface ICD10CodeService {
    ICDCode findByCode(String icd10Code);
    List<ICDCode> findAllICDCodes();
}
