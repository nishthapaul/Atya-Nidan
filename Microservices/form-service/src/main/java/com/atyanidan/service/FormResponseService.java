package com.atyanidan.service;

import com.atyanidan.entity.elasticsearch.OlapForm;
import com.atyanidan.entity.mysql.Form;

public interface FormResponseService {

    Form createFormResponse(OlapForm olapForm);
}
