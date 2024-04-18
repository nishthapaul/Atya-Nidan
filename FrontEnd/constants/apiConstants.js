const BASE_URL = 'https://72c3-119-161-98-68.ngrok-free.app';
const HEALTH_BASE_PATH = "atyanidan/health/api";
const AUTH_BASE_PATH = "atyanidan/auth/api";
const FORM_BASE_PATH = "atyanidan/form/api";

export const API_PATHS = {
    GET_DOCTORS_BY_DISTRICTS: `${BASE_URL}/${HEALTH_BASE_PATH}/districts/:districtId/doctors`,
    POST_DOCTORS_BY_DISTRICTS: `${BASE_URL}/${HEALTH_BASE_PATH}/talukas/:talukaId/doctors`,
    FIELD_WORKERS_BY_TALUKAS: `${BASE_URL}/${HEALTH_BASE_PATH}/talukas/:talukaId/fieldworkers`,
    SPECIALISATIONS: `${BASE_URL}/${HEALTH_BASE_PATH}/specialisations`,
    GET_USER_INFO: `${BASE_URL}/${HEALTH_BASE_PATH}/users/:employeeId`,
    TALUKAS: `${BASE_URL}/${HEALTH_BASE_PATH}/districts/:districtId/talukas`, 
    GET_FIELDWORKERS_BY_DISTRICTS: `${BASE_URL}/${HEALTH_BASE_PATH}/districts/:districtId/fieldworkers`,
    POST_AUTH_TOKEN_IN_LOGIN: `${BASE_URL}/${AUTH_BASE_PATH}/authenticate`,
    PUT_FIELDWORKER_ASSIGN: `${BASE_URL}/${HEALTH_BASE_PATH}/fieldworkers/:fieldworkerId`,
    GET_ADMINS_BY_STATES: `${BASE_URL}/${HEALTH_BASE_PATH}/states/:stateId/admins`,
    GET_FORMS_LIST: `${BASE_URL}/${FORM_BASE_PATH}/forms`,
    POST_ABHAID_OF_PATIENT: `${BASE_URL}/${FORM_BASE_PATH}/abha/demographics`,
    GET_FORM_CARD_DETAILS: `${BASE_URL}/${FORM_BASE_PATH}/form-definitions/:form-definition-id`,
    PUT_FORM_DEFAULT: `${BASE_URL}/${FORM_BASE_PATH}/forms/default/:formId`,
    POST_FORM_SKELETON: `${BASE_URL}/${FORM_BASE_PATH}/forms`,
};
