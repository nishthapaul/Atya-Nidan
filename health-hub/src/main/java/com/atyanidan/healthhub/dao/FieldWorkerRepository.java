package com.atyanidan.healthhub.dao;

import com.atyanidan.healthhub.entity.actor.FieldWorker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FieldWorkerRepository extends JpaRepository<FieldWorker, Integer> {
    List<FieldWorker> getFieldWorkersByTalukaId(int talukaId);
    // getByTalukaId(int) will also work
}
