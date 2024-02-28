DROP DATABASE atya_nidan_demo;

CREATE DATABASE IF NOT EXISTS atya_nidan_demo;
USE atya_nidan_demo;

CREATE TABLE IF NOT EXISTS District (
	district_id int AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    primary key (district_id)
);

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
    phone_number varchar(9),
    email varchar(100),
    role ENUM('SuperAdmin', 'Supervisor', 'Doctor', 'FieldWorker'),
    primary key (user_id)
);

CREATE TABLE IF NOT EXISTS Supervisor (
	supervisor_id int,
    name varchar(100) NOT NULL,
    address varchar(100) NOT NULL,
    district_id int NOT NULL,
    dob date,
    primary key (supervisor_id)
);

ALTER TABLE Supervisor
ADD FOREIGN KEY (supervisor_id) REFERENCES User(user_id);

ALTER TABLE Supervisor
ADD FOREIGN KEY (district_id) REFERENCES District(district_id);

CREATE TABLE IF NOT EXISTS FieldWorker (
	fieldworker_id int,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    address varchar(100) NOT NULL,
    taluka_id int NOT NULL,
    dob date,
    is_available bit DEFAULT 0,
    photo blob,
	gender ENUM('Male', 'Female', 'Other'),
    substitute_id int,
    primary key (fieldworker_id)
);

ALTER TABLE FieldWorker
ADD FOREIGN KEY (fieldworker_id) REFERENCES User(user_id);

ALTER TABLE FieldWorker
ADD FOREIGN KEY (taluka_id) REFERENCES Taluka(taluka_id);

ALTER TABLE FieldWorker
ADD FOREIGN KEY (substitute_id) REFERENCES FieldWorker(fieldworker_id);