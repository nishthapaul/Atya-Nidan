package com.atyanidan.prototype.service;

import com.atyanidan.prototype.dao.FieldWorkerRepository;
import com.atyanidan.prototype.dao.TalukaRepository;
import com.atyanidan.prototype.entity.FieldWorker;
import com.atyanidan.prototype.entity.Taluka;
import com.atyanidan.prototype.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Optional;

@Service
public class FieldWorkerServiceImpl implements FieldWorkerService {
    private FieldWorkerRepository fieldWorkerRepository;
    private TalukaRepository talukaRepository;

    @Autowired
    public FieldWorkerServiceImpl(FieldWorkerRepository fieldWorkerRepository, TalukaRepository talukaRepository) {
        this.fieldWorkerRepository = fieldWorkerRepository;
        this.talukaRepository = talukaRepository;
    }

    @Override
    public void createFieldWorker(User user, String firstName, String lastName, String address, Date dob, int talukaId, boolean available) {
        FieldWorker fieldWorker = new FieldWorker(firstName, lastName, address, dob, available);
        fieldWorker.setFieldWorkerId(user.getId());
//        fieldWorker.setUser(user);
        fieldWorker.setTaluka(findTalukaById(talukaId));
        System.out.println(fieldWorker);
        System.out.println(fieldWorker.getFieldWorkerId());

        FieldWorker dbFieldWorker = fieldWorkerRepository.save(fieldWorker);
        System.out.println(dbFieldWorker);
    }

    private Taluka findTalukaById(int talukaId) {
        Optional<Taluka> result = talukaRepository.findById(talukaId);
        Taluka taluka = null;
        if ( result.isPresent() ) {
            taluka = result.get();
        } else {
            throw new RuntimeException("Did not find taluka id of " + talukaId);
        }
        return taluka;
    }
}
