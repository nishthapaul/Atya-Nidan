package com.atyanidan.healthhub.dao;

import com.atyanidan.healthhub.entity.District;
import com.atyanidan.healthhub.entity.Taluka;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DistrictRepository extends JpaRepository<District, Integer> {
}
