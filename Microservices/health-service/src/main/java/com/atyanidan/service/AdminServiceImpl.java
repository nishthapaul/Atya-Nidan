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

    @Override
    public Admin addAdmin(int districtId, Admin admin) throws Exception{
        if (admin.getRole() != Role.Admin) {
            throw new BadRequestException("Role should be admin");
        }
        if (admin.getDistrict().getId() != districtId) {
            throw new BadRequestException("District Id in API and Response Body don't match");
        }
        Optional<District> optionalEntity = districtRepository.findById(districtId);
        if (optionalEntity.isPresent()) {
            District district = optionalEntity.get();
            admin.setDistrict(district);
            try {
                return adminRepository.save(admin);
            } catch (DataIntegrityViolationException e) {
                String exceptionRootCause = e.getRootCause().getMessage();
                if ( exceptionRootCause.contains("Duplicate entry") && exceptionRootCause.contains("phone_number") ) {
                    String errorMessage = "Phone number already exists.";
                    throw new ConflictException(errorMessage, e);
                } else if ( exceptionRootCause.contains("Duplicate entry") && exceptionRootCause.contains("email") ) {
                    String errorMessage = "Email ID already exists.";
                    throw new ConflictException(errorMessage, e);
                } else {
                    throw new BadRequestException("Some fields are required and not provided.", e);
                }
            } catch (Exception e) {
                throw new Exception(e.getMessage());
            }
        } else {
            throw new NotFoundException("District id not found: " + districtId);
        }
    }
}
