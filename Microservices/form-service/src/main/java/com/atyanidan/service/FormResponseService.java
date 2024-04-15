package com.atyanidan.service;

import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.FormResponse;

public interface FormResponseService {

    FormResponse createFormResponse(OlapForm olapForm);
}
