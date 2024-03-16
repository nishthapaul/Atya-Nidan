package com.atyanidan.healthhub.dao;

import com.atyanidan.healthhub.entity.actor.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
}
