package com.atyanidan.service;

import com.atyanidan.dao.FollowUpRepository;
import com.atyanidan.entity.mysql.FollowUp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FollowUpServiceImpl implements FollowUpService {
    FollowUpRepository followUpRepository;

    @Autowired
    public FollowUpServiceImpl(FollowUpRepository followUpRepository) {
        this.followUpRepository = followUpRepository;
    }

    @Override
    public FollowUp saveFollowUp(FollowUp followUp) {
        return followUpRepository.save(followUp);
    }
}
