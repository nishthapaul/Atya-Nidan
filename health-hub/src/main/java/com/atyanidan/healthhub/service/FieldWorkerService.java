package com.atyanidan.healthhub.service;

import com.atyanidan.healthhub.entity.actor.FieldWorker;

import java.util.List;

public interface FieldWorkerService {
    List<FieldWorker> getFieldWorkersFromTalukaId(int talukaId);
    List<FieldWorker> getFieldWorkersFromDistrictId(int districtId);

    List<FieldWorker> getFieldWorkersFromDistrictIdV2(int districtId);

    FieldWorker addFieldWorker(int talukaId, FieldWorker fieldWorker) throws Exception;
}
