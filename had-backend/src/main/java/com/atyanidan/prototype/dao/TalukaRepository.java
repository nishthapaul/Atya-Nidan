package com.atyanidan.prototype.dao;

import com.atyanidan.prototype.entity.Taluka;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TalukaRepository extends JpaRepository<Taluka, Integer> {
}
