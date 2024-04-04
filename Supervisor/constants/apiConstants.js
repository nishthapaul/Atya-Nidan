const BASE_URL = 'https://459e-119-161-98-68.ngrok-free.app';
const HEALTH_BASE_PATH = "atyanidan/health/api";

export const API_PATHS = {
    GET_DOCTORS_BY_DISTRICTS: `${BASE_URL}/${HEALTH_BASE_PATH}/districts/:districtId/doctors`,
    POST_DOCTORS_BY_DISTRICTS: `${BASE_URL}/${HEALTH_BASE_PATH}/talukas/:talukaId/doctors`,
    FIELD_WORKERS_BY_TALUKAS: `${BASE_URL}/${HEALTH_BASE_PATH}/talukas/:talukaId/fieldworkers`,
    SPECIALISATIONS: `${BASE_URL}/${HEALTH_BASE_PATH}/specialisations`,
    GET_USER_INFO: `${BASE_URL}/${HEALTH_BASE_PATH}/users/:phoneNumber`,
    TALUKAS: `${BASE_URL}/${HEALTH_BASE_PATH}/districts/:districtId/talukas`, 
    GET_FIELDWORKERS_BY_DISTRICTS: `${BASE_URL}/${HEALTH_BASE_PATH}/districts/:districtId/fieldworkers`,
};
