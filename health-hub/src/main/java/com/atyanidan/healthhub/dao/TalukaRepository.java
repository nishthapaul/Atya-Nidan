package com.atyanidan.healthhub.dao;

import com.atyanidan.healthhub.entity.Taluka;
import com.atyanidan.healthhub.entity.actor.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TalukaRepository extends JpaRepository<Taluka, Integer> {
    List<Taluka> getTalukasByDistrictId(int districtId);
}
