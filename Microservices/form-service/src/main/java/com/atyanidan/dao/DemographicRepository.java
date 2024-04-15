package com.atyanidan.dao;

import com.atyanidan.entity.mysql.Demographic;
import com.atyanidan.entity.mysql.Taluka;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemographicRepository extends JpaRepository<Demographic, Integer> {
}
