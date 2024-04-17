USE atya_nidan;

CREATE TABLE IF NOT EXISTS Abha (
	abha_id int AUTO_INCREMENT,
	abha_number varchar(14) NOT NULL UNIQUE,
    first_name varchar(100) NOT NULL,
    middle_name varchar(100),
    last_name varchar(100) NOT NULL,
    phone_number varchar(10) NOT NULL,
    dob date NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    address varchar(200) NOT NULL,
    blood_group varchar(50) NOT NULL,
    taluka varchar(50) NOT NULL,
    district varchar(50) NOT NULL,
    state varchar(50) NOT NULL,
    primary key (abha_id)
);

CREATE TABLE IF NOT EXISTS Demographic (
    demographic_id int AUTO_INCREMENT,
    first_name varchar(100) NOT NULL,
    middle_name varchar(100),
    last_name varchar(100) NOT NULL,
    phone_number varchar(10) NOT NULL,
    dob date NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    address varchar(200) NOT NULL,
    taluka_id int NOT NULL,
    blood_group varchar(50) NOT NULL,
    primary key (demographic_id)
);

ALTER TABLE Demographic
ADD FOREIGN KEY (taluka_id) REFERENCES Taluka(taluka_id);

CREATE TABLE IF NOT EXISTS Patient (
    patient_id int AUTO_INCREMENT,
    abha_number VARCHAR(14) NOT NULL UNIQUE,
    patient_number varchar(8) UNIQUE,
    demographic_id int NOT NULL UNIQUE,
    primary key (patient_id)
);

ALTER TABLE Patient
ADD FOREIGN KEY (demographic_id) REFERENCES Demographic(demographic_id);


CREATE TABLE IF NOT EXISTS Form (
    form_id int AUTO_INCREMENT,
    selected bit DEFAULT 0,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    form_definition_id varchar(100) NOT NULL UNIQUE,
    title varchar(100) NOT NULL UNIQUE,
    primary key (form_id)
);
