package com.atyanidan.service;

import com.atyanidan.dao.FormRepository;
import com.atyanidan.entity.Form;
import com.atyanidan.entity.Patient;
import com.atyanidan.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FormServiceImpl implements FormService {
    private final FormRepository formRepository;

    @Autowired
    public FormServiceImpl(FormRepository formRepository) {
        this.formRepository = formRepository;
    }

    @Override
    public Form findByTitle(String title) {
        Optional<Form> optional = formRepository.findByTitle(title);
        if ( optional.isEmpty() ) {
            throw new NotFoundException("Form doesn't exist");
        }
        return optional.get();
    }

}
