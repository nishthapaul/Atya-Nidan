package com.atyanidan.prototype.service;

import com.atyanidan.prototype.entity.User;

import java.sql.Date;

public interface FieldWorkerService {
    void createFieldWorker(User userId, String firstName, String lastName, String address, Date dob, int talukaId, boolean available);
}
