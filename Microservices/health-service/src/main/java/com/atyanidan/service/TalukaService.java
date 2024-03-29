package com.atyanidan.service;

import com.atyanidan.entity.Taluka;

import java.util.List;

public interface TalukaService {
    List<Taluka> getTalukasFromDistrictId(int districtId);
}
