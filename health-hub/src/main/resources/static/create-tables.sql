DROP DATABASE atya_nidan;

CREATE DATABASE IF NOT EXISTS atya_nidan;
USE atya_nidan;

CREATE TABLE IF NOT EXISTS State (
	state_id int AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    primary key (state_id)
);

CREATE TABLE IF NOT EXISTS District (
	district_id int AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    state_id int NOT NULL,
    primary key (district_id)
);

ALTER TABLE District
ADD FOREIGN KEY (state_id) REFERENCES State(state_id);

CREATE TABLE IF NOT EXISTS Taluka (
	taluka_id int AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    district_id int NOT NULL,
    primary key (taluka_id)
);

ALTER TABLE Taluka
ADD FOREIGN KEY (district_id) REFERENCES District(district_id);

CREATE TABLE IF NOT EXISTS User (
	user_id int AUTO_INCREMENT,
    phone_number varchar(10) NOT NULL UNIQUE,
    email varchar(100) NOT NULL UNIQUE,
    role ENUM('SuperAdmin', 'Admin', 'Doctor', 'FieldWorker') NOT NULL,
    primary key (user_id)
);

CREATE TABLE IF NOT EXISTS Admin (
	admin_id int,
    first_name varchar(100) NOT NULL,
    middle_name varchar(100),
    last_name varchar(100) NOT NULL,
    home_address varchar(100) NOT NULL,
    office_address varchar(100) NOT NULL,
    languages_known varchar(50) DEFAULT "Hindi",
    district_id int NOT NULL UNIQUE,
    dob date,
    photo blob,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    primary key (admin_id)
);

ALTER TABLE Admin
ADD FOREIGN KEY (admin_id) REFERENCES User(user_id);

ALTER TABLE Admin
ADD FOREIGN KEY (district_id) REFERENCES District(district_id);

CREATE TABLE IF NOT EXISTS Field_Worker (
	field_worker_id int,
    first_name varchar(100) NOT NULL,
    middle_name varchar(100),
    last_name varchar(100) NOT NULL,
    home_address varchar(100) NOT NULL,
    office_address varchar(100) NOT NULL,
    nearest_railway_station varchar(100),
    languages_known varchar(50) DEFAULT "Hindi",
    taluka_id int NOT NULL,
    dob date,
    available bit DEFAULT 0,
    photo blob,
	gender ENUM('Male', 'Female', 'Other') NOT NULL,
	blood_group varchar(10),
	aadhar_number varchar(12),
    substitute_id int,
    primary key (field_worker_id)
);

ALTER TABLE Field_Worker
ADD FOREIGN KEY (field_worker_id) REFERENCES User(user_id);

ALTER TABLE Field_Worker
ADD FOREIGN KEY (taluka_id) REFERENCES Taluka(taluka_id);

ALTER TABLE Field_Worker
ADD FOREIGN KEY (substitute_id) REFERENCES Field_Worker(field_worker_id);

CREATE TABLE IF NOT EXISTS Specialisation (
	specialisation_id int AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    description varchar(100),
    primary key (specialisation_id)
);

CREATE TABLE IF NOT EXISTS Doctor (
	doctor_id int,
    first_name varchar(100) NOT NULL,
    middle_name varchar(100),
    last_name varchar(100) NOT NULL,
    home_address varchar(100) NOT NULL,
    hospital_address varchar(100) NOT NULL,
    nearest_railway_station varchar(100),
    specialisation_id int NOT NULL,
    languages_known varchar(50) DEFAULT "Hindi",
    taluka_id int NOT NULL,
    dob date,
    photo blob,
	gender ENUM('Male', 'Female', 'Other') NOT NULL,
	blood_group varchar(10),
	aadhar_number varchar(12),
    primary key (doctor_id)
);

ALTER TABLE Doctor
ADD FOREIGN KEY (doctor_id) REFERENCES User(user_id);

ALTER TABLE Doctor
ADD FOREIGN KEY (taluka_id) REFERENCES Taluka(taluka_id);

ALTER TABLE Doctor
ADD FOREIGN KEY (specialisation_id) REFERENCES Specialisation(specialisation_id);
