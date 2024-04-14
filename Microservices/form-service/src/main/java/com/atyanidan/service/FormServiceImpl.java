package com.atyanidan.service;

import com.atyanidan.dao.FormDefinitionRepository;
import com.atyanidan.dao.FormRepository;
import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.entity.mysql.Form;
import com.atyanidan.exception.ConflictException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FormServiceImpl implements FormService {
    private final FormRepository formRepository;
    private final FormDefinitionRepository formDefinitionRepository;

    @Autowired
    public FormServiceImpl(FormRepository formRepository, FormDefinitionRepository formDefinitionRepository) {
        this.formRepository = formRepository;
        this.formDefinitionRepository = formDefinitionRepository;
    }

    public Form createForm(FormDefinition formDefinition) {
        if ( formRepository.countByTitle(formDefinition.getTitle()) == 0 ) {
            FormDefinition savedFormDefinition = formDefinitionRepository.save(formDefinition);
            System.out.println(savedFormDefinition.getId());

//            List<Form> forms = formRepository.findAll();
//            forms.forEach(form -> form.setSelected(false));
//            formRepository.saveAll(forms);

            Form form = new Form(savedFormDefinition.getTitle(), savedFormDefinition.getId());
            return formRepository.save(form);
        } else {
            String errorMessage = "Form name already exists.";
            throw new ConflictException(errorMessage);
        }
    }
}
