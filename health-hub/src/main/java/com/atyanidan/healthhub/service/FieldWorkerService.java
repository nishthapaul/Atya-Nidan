package com.atyanidan.healthhub.service;

import com.atyanidan.healthhub.entity.actor.FieldWorker;
import com.atyanidan.healthhub.model.requestbody.FieldWorkerAvailabilityRequest;

import java.util.List;

public interface FieldWorkerService {
    List<FieldWorker> getFieldWorkersFromTalukaId(int talukaId);
    List<FieldWorker> getFieldWorkersFromDistrictId(int districtId);

    List<FieldWorker> getFieldWorkersFromDistrictIdV2(int districtId, int offset, int pageSize);

    FieldWorker addFieldWorker(int talukaId, FieldWorker fieldWorker) throws Exception;

    FieldWorker updateAvailability(int fieldWorkerId, FieldWorkerAvailabilityRequest requestBody);
}
