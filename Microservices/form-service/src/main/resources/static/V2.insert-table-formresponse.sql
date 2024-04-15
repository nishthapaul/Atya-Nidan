CREATE TABLE IF NOT EXISTS Form_Response (
    form_response_id int AUTO_INCREMENT,
    form_id int NOT NULL,
    fieldworker_id int NOT NULL,
--    patient_id int NOT NULL,
    submitted_on DATETIME NOT NULL,
    olap_form_id varchar(50) NOT NULL UNIQUE,
    primary key (form_response_id)
);

--ALTER TABLE FormResponse
--ADD FOREIGN KEY (taluka_id) REFERENCES Taluka(taluka_id);
--
--ALTER TABLE FormResponse
--ADD FOREIGN KEY (form_id) REFERENCES Form(form_id);
--
--ALTER TABLE FormResponse
--ADD FOREIGN KEY (fieldworker_id) REFERENCES Fieldworker(field_worker_id);
--
--ALTER TABLE FormResponse
--ADD FOREIGN KEY (patient_id) REFERENCES Patient(patient_id);
--
--CREATE TABLE IF NOT EXISTS Patient (
--    patient_id int AUTO_INCREMENT,
--    abha_id varchar(14) NOT NULL UNIQUE,
--    patient_number varchar(8) NOT NULL UNIQUE,
--    primary key(patient_id)
--);
--
--ALTER TABLE Patient
--ADD FOREIGN KEY (abha_id) REFERENCES Abha(abha_id);
