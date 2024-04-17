package com.atyanidan.service;

import com.atyanidan.dao.FormRepository;
import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.entity.mysql.Form;
import com.atyanidan.exception.ConflictException;
import com.atyanidan.exception.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FormServiceImpl implements FormService {
    private final FormRepository formRepository;
    private final FormDefinitionService formDefinitionService;

    @Autowired
    public FormServiceImpl(FormRepository formRepository, FormDefinitionService formDefinitionService) {
        this.formRepository = formRepository;
        this.formDefinitionService = formDefinitionService;
    }

    public Form createForm(FormDefinition formDefinition) {
        if ( formRepository.countByTitle(formDefinition.getTitle()) == 0 ) {
            FormDefinition savedFormDefinition = formDefinitionService.insertFormDefinition(formDefinition);

            Form form = new Form(savedFormDefinition.getTitle(), savedFormDefinition.getId());
            return formRepository.save(form);
        } else {
            String errorMessage = "Form name already exists.";
            throw new ConflictException(errorMessage);
        }
    }

    public Form setDefaultForm(int formId) {
        Form formToBeDefault = getFormById(formId);
        List<Form> forms = formRepository.findAll();
        forms.forEach(form -> form.setSelected(false));
        formRepository.saveAll(forms);

        formToBeDefault.setSelected(true);
        return formRepository.save(formToBeDefault);
    }

    public Form getFormById(int formId) {
        Optional<Form> optionalForm = formRepository.findById(formId);
        if ( optionalForm.isEmpty() ) {
            throw new NotFoundException("Form doesn't exist.");
        }
        return optionalForm.get();
    }

    @Override
    public FormDefinition getSelectedForm() {
        Form selectedForm = formRepository.getSelectedForm();
        return formDefinitionService.getFormDefinition(selectedForm.getFormDefinitionId());
    }

    @Override
    public List<Form> getForms() {
        return formRepository.findAllByOrderBySelectedDescTitleAsc();
    }
}
