package com.atyanidan.prototype.service;

import com.atyanidan.prototype.entity.District;
import com.atyanidan.prototype.entity.FieldWorker;

import java.util.List;

public interface DistrictService {
    District findById(int districtId);

    List<FieldWorker> findAllFieldWorkersByDistrictId(int districtId);
}
