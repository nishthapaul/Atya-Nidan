package com.atyanidan.healthhub.controller;

import com.atyanidan.healthhub.entity.actor.FieldWorker;
import com.atyanidan.healthhub.model.APIResponse;
import com.atyanidan.healthhub.model.requestbody.FieldWorkerAvailabilityRequest;
import com.atyanidan.healthhub.service.FieldWorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/atyanidan")
public class FieldWorkerController {
    private final FieldWorkerService fieldWorkerService;

    @Autowired
    public FieldWorkerController(FieldWorkerService fieldWorkerService) {
        this.fieldWorkerService = fieldWorkerService;
    }

    @GetMapping("/talukas/{talukaId}/fieldworkers")
    public List<FieldWorker> getFieldWorkersFromTalukaId(@PathVariable int talukaId, @RequestParam(required = false) Boolean available) {
        if ( available != null )
            return fieldWorkerService.getFieldWorkersByTalukaIdAndAvailable(talukaId, available);
        else
            return fieldWorkerService.getFieldWorkersByTalukaId(talukaId);
    }

    @GetMapping("/districts/{districtId}/fieldworkers")
    public List<FieldWorker> getFieldWorkersFromDistrictId(@PathVariable int districtId) {
        return fieldWorkerService.getFieldWorkersFromDistrictIdV2(districtId);
    }

    @PostMapping("/talukas/{talukaId}/fieldworkers")
    public ResponseEntity<FieldWorker> addFieldWorker(@PathVariable int talukaId, @RequestBody FieldWorker fieldWorker) throws Exception {
        FieldWorker dbFieldWorker = fieldWorkerService.addFieldWorker(talukaId, fieldWorker);
        return ResponseEntity.status(HttpStatus.CREATED).body(dbFieldWorker);
    }

    @PutMapping("/fieldworkers/{fieldWorkerId}")
    public ResponseEntity<FieldWorker> updateFieldWorkerAvailability(@PathVariable int fieldWorkerId, @RequestBody FieldWorkerAvailabilityRequest requestBody) {
        FieldWorker dbFieldWorker = fieldWorkerService.updateAvailability(fieldWorkerId, requestBody);
        return ResponseEntity.status(HttpStatus.OK).body(dbFieldWorker);
    }

}
