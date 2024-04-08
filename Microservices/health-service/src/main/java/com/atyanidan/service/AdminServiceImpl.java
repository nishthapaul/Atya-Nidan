package com.atyanidan.service;

import com.atyanidan.dao.AdminRepository;
import com.atyanidan.dao.DistrictRepository;
import com.atyanidan.entity.District;
import com.atyanidan.entity.Role;
import com.atyanidan.entity.actor.Admin;
import com.atyanidan.exception.ConflictException;
import com.atyanidan.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
