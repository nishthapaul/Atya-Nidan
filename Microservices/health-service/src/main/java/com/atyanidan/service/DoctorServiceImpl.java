package com.atyanidan.service;

import com.atyanidan.dao.DoctorRepository;
import com.atyanidan.dao.TalukaRepository;
import com.atyanidan.exception.ConflictException;
import com.atyanidan.exception.NotFoundException;
import com.atyanidan.entity.Taluka;
import com.atyanidan.entity.actor.Doctor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final TalukaRepository talukaRepository;

    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository, TalukaRepository talukaRepository) {
        this.doctorRepository = doctorRepository;
        this.talukaRepository = talukaRepository;
    }

    @Override
    public List<Doctor> getDoctorsFromDistrictId(int districtId) {
        return doctorRepository.getDoctorsFromDistrictId(districtId);
    }

    @Override
    public Doctor addDoctor(int talukaId, Doctor doctor) throws Exception {
        Optional<Taluka> optionalEntity = talukaRepository.findById(talukaId);
        if ( optionalEntity.isEmpty() ) {
            throw new NotFoundException("Taluka id not found: " + talukaId);
        }

        Taluka taluka = optionalEntity.get();
        doctor.setTaluka(taluka);
        try {
            return doctorRepository.save(doctor);
        } catch (DataIntegrityViolationException e) {
            if ( e.getMessage().contains("Duplicate entry") ) {
                String errorMessage = "Phone number or email already exists.";
                throw new ConflictException(errorMessage, e);
            } else {
                throw new BadRequestException("Some fields are required and not provided.", e);
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }
}
