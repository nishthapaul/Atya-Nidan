package com.atyanidan.dao;

import com.atyanidan.entity.actor.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    @Query("SELECT fw FROM Doctor fw JOIN fw.taluka t JOIN t.district d WHERE d.id = :districtId")
    List<Doctor> getDoctorsFromDistrictId(int districtId);

    List<Doctor> findBySpecialisationIdAndTalukaDistrictId(int specialisationId, int talukaId);
}
