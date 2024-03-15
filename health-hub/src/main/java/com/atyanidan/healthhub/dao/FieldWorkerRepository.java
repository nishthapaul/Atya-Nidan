package com.atyanidan.healthhub.dao;

import com.atyanidan.healthhub.entity.actor.FieldWorker;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FieldWorkerRepository extends JpaRepository<FieldWorker, Integer> {
    List<FieldWorker> getFieldWorkersByTalukaId(int talukaId);
    // getByTalukaId(int) will also work

    @Query("SELECT fw FROM FieldWorker fw JOIN fw.taluka t JOIN t.district d WHERE d.id = :districtId")
    List<FieldWorker> getFieldWorkersByDistrictId(int districtId, Sort sort);
}
