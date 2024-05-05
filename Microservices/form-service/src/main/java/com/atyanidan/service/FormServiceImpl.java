package com.atyanidan.service;

import com.atyanidan.dao.FormRepository;
import com.atyanidan.dao.SpecialisationRepository;
import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.entity.mysql.Form;
import com.atyanidan.entity.mysql.Specialisation;
import com.atyanidan.exception.ConflictException;
import com.atyanidan.exception.NotFoundException;
import com.atyanidan.response.FormsWithFormDefinitionsResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FormServiceImpl implements FormService {
    private final FormRepository formRepository;
    private final FormDefinitionService formDefinitionService;

    private final SpecialisationRepository specialisationRepository;

    @Autowired
    public FormServiceImpl(FormRepository formRepository, FormDefinitionService formDefinitionService, SpecialisationRepository specialisationRepository) {
        this.formRepository = formRepository;
        this.formDefinitionService = formDefinitionService;
        this.specialisationRepository = specialisationRepository;
    }

    public Form createForm(FormDefinition formDefinition) {
        if ( formRepository.countByTitle(formDefinition.getTitle()) == 0 ) {
            FormDefinition savedFormDefinition = formDefinitionService.insertFormDefinition(formDefinition);

            Specialisation specialisation = specialisationRepository.getByName(formDefinition.getSpecialisation());

            Form form = new Form(savedFormDefinition.getTitle(), savedFormDefinition.getId(), specialisation);
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
    public List<FormsWithFormDefinitionsResponse> getFormsWithFormDefinitions() {
        List<Form> forms = formRepository.findAll();
        List<FormsWithFormDefinitionsResponse> formsWithFormDefinitionsResponses = new ArrayList<>();
        for (Form form : forms) {
            FormsWithFormDefinitionsResponse formsWithFormDefinitionsResponse = new FormsWithFormDefinitionsResponse(form.getFormId(), form.getTitle(), form.getSelected(), formDefinitionService.getFormDefinition(form.getFormDefinitionId()), form.getSpecialisation());
            formsWithFormDefinitionsResponses.add(formsWithFormDefinitionsResponse);
        }
        return formsWithFormDefinitionsResponses;
    }

    @Override
    public List<Form> getForms() {
        return formRepository.findAllByOrderBySelectedDescTitleAsc();
    }
}
