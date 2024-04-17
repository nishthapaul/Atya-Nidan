package com.atyanidan.dao;

import com.atyanidan.entity.elasticsearch.OlapPrescription;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OlapPrescriptionRepository extends ElasticsearchRepository<OlapPrescription, String> {
}
