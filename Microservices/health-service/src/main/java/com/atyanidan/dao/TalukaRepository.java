package com.atyanidan.dao;

import com.atyanidan.entity.Taluka;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TalukaRepository extends JpaRepository<Taluka, Integer> {
    List<Taluka> getTalukasByDistrictId(int districtId, Sort sort);
}
