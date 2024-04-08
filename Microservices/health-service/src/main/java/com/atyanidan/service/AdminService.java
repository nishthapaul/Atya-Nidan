package com.atyanidan.service;

import com.atyanidan.entity.actor.Admin;
import com.atyanidan.entity.actor.FieldWorker;

import java.util.List;

public interface AdminService {
    List<Admin> getAdminsFromStateId(int stateId);
}
