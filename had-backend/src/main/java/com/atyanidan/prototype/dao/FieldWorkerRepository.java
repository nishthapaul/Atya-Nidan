package com.atyanidan.prototype.dao;

import com.atyanidan.prototype.entity.FieldWorker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FieldWorkerRepository extends JpaRepository<FieldWorker, Integer> {
}
