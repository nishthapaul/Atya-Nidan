package com.atyanidan.controller;

import com.atyanidan.service.StatsService;
import com.atyanidan.utils.UnHealthyCountByDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stats")
public class StatsController {

    private final StatsService statsService;

    @Autowired
    public StatsController(StatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/admin/{districtId}")
    public ResponseEntity<List<UnHealthyCountByDate>> getHealthCount(@PathVariable int districtId) {
        List<UnHealthyCountByDate> healthCount = statsService.getHealthCountByDate(districtId);
        return ResponseEntity.status(HttpStatus.OK).body(healthCount);
    }
}
