package com.atyanidan.healthhub.dao;

import com.atyanidan.healthhub.entity.actor.Doctor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    @Query("SELECT fw FROM Doctor fw JOIN fw.taluka t JOIN t.district d WHERE d.id = :districtId")
    List<Doctor> getDoctorsFromDistrictId(int districtId, PageRequest pageRequest);
}
