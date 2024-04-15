package com.atyanidan.dao;

import com.atyanidan.entity.elasticsearch.FormDefinition;
import com.atyanidan.entity.elasticsearch.OlapForm;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface OlapFormRepository extends ElasticsearchRepository<OlapForm, String> {
}
