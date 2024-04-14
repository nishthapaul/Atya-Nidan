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
    address varchar(100) NOT NULL,
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
    address varchar(100) NOT NULL,
    taluka_id int NOT NULL,
    primary key (demographic_id)
);

CREATE TABLE IF NOT EXISTS Patient (
    patient_id int AUTO_INCREMENT,
    abha_id int NOT NULL UNIQUE,
    patient_number varchar(8) NOT NULL UNIQUE,
    demographic_id int NOT NULL UNIQUE,
    primary key (patient_id)
);

CREATE TABLE IF NOT EXISTS Form (
    form_id int AUTO_INCREMENT,
    selected bit DEFAULT 0,
    created_on DATETIME NOT NULL,
    form_definition_id varchar(100) NOT NULL,
    primary key (form_id)
);

ALTER TABLE Patient
ADD FOREIGN KEY (abha_id) REFERENCES Abha(abha_id);

ALTER TABLE Patient
ADD FOREIGN KEY (demographic_id) REFERENCES Demographic(demographic_id) ON DELETE CASCADE;

ALTER TABLE Demographic
ADD FOREIGN KEY (taluka_id) REFERENCES Taluka(taluka_id);
