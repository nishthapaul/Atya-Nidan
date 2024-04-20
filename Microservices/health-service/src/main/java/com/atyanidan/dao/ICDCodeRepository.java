package com.atyanidan.dao;

import com.atyanidan.entity.ICDCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ICDCodeRepository extends JpaRepository<ICDCode, Integer> {
    Optional<ICDCode> findByCode(String icd10Code);
}
