package com.atyanidan.healthhub.service;

import com.atyanidan.healthhub.entity.actor.FieldWorker;
import com.atyanidan.healthhub.model.requestbody.FieldWorkerAvailabilityRequest;

import java.util.List;

public interface FieldWorkerService {
    List<FieldWorker> getFieldWorkersByTalukaId(int talukaId);
    List<FieldWorker> getFieldWorkersByTalukaIdAndAvailable(int talukaId, Boolean available);
    List<FieldWorker> getFieldWorkersFromDistrictId(int districtId);

    List<FieldWorker> getFieldWorkersFromDistrictIdV2(int districtId);

    FieldWorker addFieldWorker(int talukaId, FieldWorker fieldWorker) throws Exception;

    FieldWorker updateAvailability(int fieldWorkerId, FieldWorkerAvailabilityRequest requestBody);
}
