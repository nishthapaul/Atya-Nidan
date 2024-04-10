package com.atyanidan.service;

import com.atyanidan.dao.AdminRepository;
import com.atyanidan.dao.DistrictRepository;
import com.atyanidan.entity.actor.Admin;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final AdminRepository adminRepository;
    private final DistrictRepository districtRepository;

    @Override
    public List<Admin> getAdminsFromStateId(int stateId) {
        return adminRepository.getAdminsByStateId(stateId);
    }
}
