package com.atyanidan.healthhub.service;

import com.atyanidan.healthhub.entity.Taluka;

import java.util.List;

public interface TalukaService {
    List<Taluka> getTalukasFromDistrictId(int districtId);
}
