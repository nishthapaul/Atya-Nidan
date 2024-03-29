package com.atyanidan.healthhub.dao;

import com.atyanidan.healthhub.entity.Specialisation;
import com.atyanidan.healthhub.entity.actor.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialisationRepository extends JpaRepository<Specialisation, Integer> {
}
