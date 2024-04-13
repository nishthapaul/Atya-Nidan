package com.atyanidan.util;

public class Constants {
    protected static final String BASE_PATH = "http://localhost:9001";
    protected static final String HEALTH_SERVICE_BASE_PATH = "/atyanidan/health/api";
    protected static final String FORM_SERVICE_BASE_PATH = "/atyanidan/form/api";

    protected static final String DOCTORS_BY_DISTRICTS = "/districts/{districtId}/doctors";
    protected static final String FIELDWORKERS_BY_DISTRICTS = "/districts/{districtId}/fieldworkers";
    protected static final String FIELDWORKERS_BY_TALUKAS = "/talukas/{talukaId}/fieldworkers";
    protected static final String ADMINS_BY_STATES = "/states/{stateId}/admins";
}
