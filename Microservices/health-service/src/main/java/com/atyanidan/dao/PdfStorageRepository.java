package com.atyanidan.dao;

import com.atyanidan.entity.PdfStorage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PdfStorageRepository extends JpaRepository<PdfStorage, Integer> {
}
