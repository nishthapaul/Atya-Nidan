package com.atyanidan.dao;

import com.atyanidan.entity.actor.Admin;
import com.atyanidan.entity.actor.FieldWorker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    @Query("SELECT ad FROM Admin ad JOIN ad.district t JOIN t.state d WHERE d.id = :stateId")
    List<Admin> getAdminsByStateId(int stateId);
}
