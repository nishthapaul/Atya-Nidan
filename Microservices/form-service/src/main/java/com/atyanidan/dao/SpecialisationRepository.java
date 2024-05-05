package com.atyanidan.dao;

import com.atyanidan.entity.mysql.Specialisation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialisationRepository extends JpaRepository<Specialisation, Integer> {
    Specialisation getByName(String name);
}
