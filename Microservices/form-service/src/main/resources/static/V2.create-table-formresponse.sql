CREATE TABLE IF NOT EXISTS Form_Response (
    form_response_id int AUTO_INCREMENT,
    form_id int NOT NULL,
    fieldworker_id int NOT NULL,
    patient_id int NOT NULL,
    submitted_on DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    olap_form_id varchar(50) NOT NULL UNIQUE,
    form_type ENUM('Regular', 'FollowUp') NOT NULL,
    primary key (form_response_id)
);

ALTER TABLE Form_Response
ADD FOREIGN KEY (form_id) REFERENCES Form(form_id);

ALTER TABLE Form_Response
ADD FOREIGN KEY (fieldworker_id) REFERENCES Field_Worker(field_worker_id);

ALTER TABLE Form_Response
ADD FOREIGN KEY (patient_id) REFERENCES Patient(patient_id);
