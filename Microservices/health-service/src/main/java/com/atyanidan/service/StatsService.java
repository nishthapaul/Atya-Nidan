package com.atyanidan.service;

import com.atyanidan.utils.UnHealthyCountByDate;

import java.util.List;

public interface StatsService {
    List<UnHealthyCountByDate> getHealthCountByDate(int districtId);
}
