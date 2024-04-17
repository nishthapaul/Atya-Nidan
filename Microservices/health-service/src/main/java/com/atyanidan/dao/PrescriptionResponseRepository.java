package com.atyanidan.dao;

import com.atyanidan.entity.PrescriptionResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrescriptionResponseRepository extends JpaRepository<PrescriptionResponse, Integer> {
}
