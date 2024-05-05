package com.atyanidan.dao;

import com.atyanidan.entity.elasticsearch.FormDefinition;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface FormDefinitionRepository extends ElasticsearchRepository<FormDefinition, String> {
}
