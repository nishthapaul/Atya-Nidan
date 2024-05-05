package com.atyanidan.util;

public class Constants {
    protected static final String BASE_PATH = "http://localhost:9001";
    protected static final String HEALTH_SERVICE_BASE_PATH = "/atyanidan/health/api";
    protected static final String FORM_SERVICE_BASE_PATH = "/atyanidan/form/api";

    protected static final String DOCTORS_BY_DISTRICTS = "/districts/{districtId}/doctors";
    protected static final String FIELDWORKERS_BY_DISTRICTS = "/districts/{districtId}/fieldworkers";
    protected static final String FIELDWORKERS_BY_TALUKAS = "/talukas/{talukaId}/fieldworkers";
    protected static final String ADMINS_BY_STATES = "/states/{stateId}/admins";
    protected static final String CREATE_FORM = "/form-responses";
    protected static final String FOLLOW_UPS_OF_FIELDWORKER = "/fieldworkers/{fieldworkerId}/followups";
    protected static final String CREATE_PRESCRIPTION = "/prescription-responses";

    protected static final String ADMIN_STATS = "/stats/admin/{districtId}";
}
