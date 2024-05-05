const BASE_URL = 'https://01f6-119-161-98-68.ngrok-free.app';

const HEALTH_BASE_PATH = "atyanidan/health/api";
const AUTH_BASE_PATH = "atyanidan/auth/api";
const FORM_BASE_PATH = "atyanidan/form/api";

export const API_PATHS = {

    //admin
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
    GET_STATS_FOR_ADMIN: `${BASE_URL}/${HEALTH_BASE_PATH}/stats/admin/:districtId`,

    //Super admin
    GET_FORMS_LIST: `${BASE_URL}/${FORM_BASE_PATH}/forms`,
    GET_FORM_CARD_DETAILS: `${BASE_URL}/${FORM_BASE_PATH}/form-definitions/:form-definition-id`,
    PUT_FORM_DEFAULT: `${BASE_URL}/${FORM_BASE_PATH}/forms/default/:formId`,
    POST_FORM_SKELETON: `${BASE_URL}/${FORM_BASE_PATH}/forms`,

    //Doctor
    GET_PATIENTID_OF_PATIENT: `${BASE_URL}/${HEALTH_BASE_PATH}/patients/:patientNumber/demographics`,
    POST_ABHAID_OF_PATIENT: `${BASE_URL}/${FORM_BASE_PATH}/abha/demographics`,
    GET_MEDICAL_HISTORY: `${BASE_URL}/${HEALTH_BASE_PATH}/patients/:patientNumber/health-records`,
    GET_ICDCODE_LIST: `${BASE_URL}/${HEALTH_BASE_PATH}/icd10Codes`,
    POST_PRESCRIPTION_RESPONSE: `${BASE_URL}/${HEALTH_BASE_PATH}/prescription-responses`, 
    GET_LIST_OF_PATIENTS: `${BASE_URL}/${HEALTH_BASE_PATH}/doctors/:DoctorNumber/patients`,
    GET_PDFS_OF_FORMS_AND_PRESCRIPTIONS: `${BASE_URL}/${HEALTH_BASE_PATH}/pdfwriter/33`,
    
    //Field worker
    GET_USER_ALL_DETAILS: `${BASE_URL}/${HEALTH_BASE_PATH}/fieldworkers/:fieldworkerNumber/followups`,
    GET_DOCTOR_RECOMMENDATION: `${BASE_URL}/${HEALTH_BASE_PATH}/doctors/specialisations/:specialisationId/talukas/:talukaId`,
    GET_FORMS_FOR_PATIENTS: `${BASE_URL}/${FORM_BASE_PATH}/forms/form-definitions`,
    POST_SYNC_FW_SCREEN: `${BASE_URL}/${FORM_BASE_PATH}/form-responses`
};
