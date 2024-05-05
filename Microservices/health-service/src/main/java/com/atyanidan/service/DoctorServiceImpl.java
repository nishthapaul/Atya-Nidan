package com.atyanidan.service;

import com.atyanidan.dao.DoctorRepository;
import com.atyanidan.dao.SpecialisationRepository;
import com.atyanidan.dao.TalukaRepository;
import com.atyanidan.entity.Role;
import com.atyanidan.entity.Specialisation;
import com.atyanidan.entity.Taluka;
import com.atyanidan.entity.actor.Doctor;
import com.atyanidan.exception.ConflictException;
import com.atyanidan.exception.NotFoundException;
import com.atyanidan.utils.EmployeeIdGenerator;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final TalukaService talukaService;
    private final SpecialisationRepository specialisationRepository;

    private final EmployeeIdGenerator employeeIdGenerator;


    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository, TalukaService talukaService, SpecialisationRepository specialisationRepository, EmployeeIdGenerator employeeIdGenerator) {
        this.doctorRepository = doctorRepository;
        this.talukaService = talukaService;
        this.specialisationRepository = specialisationRepository;
        this.employeeIdGenerator = employeeIdGenerator;
    }

    @Override
    public List<Doctor> getDoctorsFromDistrictId(int districtId) {
        return doctorRepository.getDoctorsFromDistrictId(districtId);
    }

    @Override
    public Doctor addDoctor(int talukaId, Doctor doctor) throws Exception {
        if ( doctor.getRole() != Role.Doctor ) {
            throw new BadRequestException("Role should be Doctor");
        }
        if ( doctor.getTaluka().getId() != talukaId ) {
            throw new BadRequestException("Taluka Id in API and Response Body don't match");
        }

        Taluka taluka = talukaService.findByTalukaId(talukaId);
        doctor.setTaluka(taluka);

        Optional<Specialisation> optionalSpecialisation = specialisationRepository.findById(doctor.getSpecialisation().getId());
        if ( optionalSpecialisation.isEmpty() ) {
            throw new NotFoundException("Specialisation id not found: " + specialisationRepository);
        }

        Specialisation specialisation = optionalSpecialisation.get();
        doctor.setSpecialisation(specialisation);

        try {
            Doctor dbDoctor = doctorRepository.save(doctor);
            String employeeID = employeeIdGenerator.generate("DC", doctor.getId(), doctor.getFirstName());
            dbDoctor.setEmpId(employeeID);
            dbDoctor = doctorRepository.save(dbDoctor);
            return dbDoctor;
        } catch (DataIntegrityViolationException e) {
            String exceptionRootCause = e.getRootCause().getMessage();
            if ( exceptionRootCause.contains("Duplicate entry") && exceptionRootCause.contains("phone_number") ) {
                String errorMessage = "Phone number already exists.";
                throw new ConflictException(errorMessage, e);
            } else if ( exceptionRootCause.contains("Duplicate entry") && exceptionRootCause.contains("email") ) {
                String errorMessage = "Email ID already exists.";
                throw new ConflictException(errorMessage, e);
            } else if ( exceptionRootCause.contains("Duplicate entry") && exceptionRootCause.contains("aadhar_number") ) {
                String errorMessage = "Aadhar Number already exists.";
                throw new ConflictException(errorMessage, e);
            } else {
                throw new BadRequestException("Some fields are required and not provided.", e);
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Override
    public List<Doctor> findBySpecialisation(int specialisationId, int talukaId) {
        Taluka taluka = talukaService.findByTalukaId(talukaId);
        int districtId = taluka.getDistrict().getId();
        return doctorRepository.findBySpecialisationIdAndTalukaDistrictId(specialisationId, districtId);
    }
}
