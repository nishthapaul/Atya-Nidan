USE atya_nidan;

INSERT INTO `atya_nidan`.`State` (`name`) VALUES ('Haryana');
INSERT INTO `atya_nidan`.`State` (`name`) VALUES ('Uttar Pradesh');

INSERT INTO `atya_nidan`.`District` (`name`, `state_id`) VALUES ('Gurgaon', '1');
INSERT INTO `atya_nidan`.`District` (`name`, `state_id`) VALUES ('Agra', '2');
INSERT INTO `atya_nidan`.`District` (`name`, `state_id`) VALUES ('Ghaziabad', '2');

INSERT INTO `atya_nidan`.`Taluka` (`name`, `district_id`) VALUES ('Sohna', '1');
INSERT INTO `atya_nidan`.`Taluka` (`name`, `district_id`) VALUES ('Pataudi', '1');
INSERT INTO `atya_nidan`.`Taluka` (`name`, `district_id`) VALUES ('Manesar', '1');
INSERT INTO `atya_nidan`.`Taluka` (`name`, `district_id`) VALUES ('Etmadpur', '2');
INSERT INTO `atya_nidan`.`Taluka` (`name`, `district_id`) VALUES ('Fatehabad', '2');
INSERT INTO `atya_nidan`.`Taluka` (`name`, `district_id`) VALUES ('Kheragarh', '2');
INSERT INTO `atya_nidan`.`Taluka` (`name`, `district_id`) VALUES ('Hapur', '3');
INSERT INTO `atya_nidan`.`Taluka` (`name`, `district_id`) VALUES ('Modinagar', '3');
INSERT INTO `atya_nidan`.`Taluka` (`name`, `district_id`) VALUES ('Garhmukteshwar', '3');

INSERT INTO `atya_nidan`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644164', 'shouryagupta@gmail.com', 'Admin');
INSERT INTO `atya_nidan`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644165', 'priyasinghania@gmail.com', 'Admin');
INSERT INTO `atya_nidan`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644166', 'giakundra@gmail.com', 'Admin');
INSERT INTO `atya_nidan`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644167', 'ramkumar@gmail.com', 'FieldWorker');
INSERT INTO `atya_nidan`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644168', 'ajaykumar@gmail.com', 'FieldWorker');
INSERT INTO `atya_nidan`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644169', 'anirudhchaudhary@gmail.com', 'FieldWorker');
INSERT INTO `atya_nidan`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644170', 'simrangupta@gmail.com', 'FieldWorker');
INSERT INTO `atya_nidan`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644171', 'juhichawla@gmail.com', 'FieldWorker');
INSERT INTO `atya_nidan`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644172', 'ranimishra@gmail.com', 'FieldWorker');
INSERT INTO `atya_nidan`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644173', 'prakashchauhan@gmail.com', 'FieldWorker');
INSERT INTO `atya_nidan`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644174', 'angadgill@gmail.com', 'Doctor');
INSERT INTO `atya_nidan`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644175', 'rudrarathod@gmail.com', 'Doctor');

INSERT INTO `atya_nidan`.`Admin` (`admin_id`, `first_name`, `last_name`, `home_address`, `office_address`, `district_id`, `gender`, `dob`, aadhar_number) VALUES (1, 'Shourya', 'Gupta', 'House No. 1812 Sector 17', 'neelkanth office sector 62', '1', 'Male', '1990-12-12', '999999999998');
INSERT INTO `atya_nidan`.`Admin` (`admin_id`, `first_name`, `last_name`, `home_address`, `office_address`, `district_id`, `gender`, `dob`, aadhar_number) VALUES (2, 'Priya', 'Singhania', 'House No. 1812 Sector 17', 'neelkanth office sector 63', '2', 'Female', '1990-12-22', '999999999999');
INSERT INTO `atya_nidan`.`Admin` (`admin_id`, `first_name`, `last_name`, `home_address`, `office_address`, `district_id`, `gender`, `dob`, aadhar_number) VALUES (3, 'Gia', 'Kundra', 'House No. 1812 Sector 17', 'neelkanth office sector 64', '3', 'Female', '1990-12-24', '999999999910');

INSERT INTO `atya_nidan`.`Field_Worker` (`field_worker_id`, `first_name`, `middle_name`, `last_name`, `home_address`, `office_address`, `nearest_railway_station`, `taluka_id`, `dob`, `available`, `gender`, `blood_group`, `language_known_1`, aadhar_number) VALUES
(4, 'Ram', 'Kumar', 'Gupta', 'House no 1811 sector 16', 'Office No 1234, Sector 17, MG Road', 'Old Faridabad Metro Station', 8, '2020-12-12', 1, 'Male', 'B+', 'Hindi', '999999999991'),
(5, 'Ajay', 'H', 'Kumar', 'House no 1811 sector 16', 'Office No 1234, Sector 17, MG Road', 'Old Faridabad Metro Station', 8, '2020-12-12', 1, 'Male', 'O', 'Hindi', '999999999992'),
(6, 'Anirudh', 'G', 'Chaudhary', 'House no 1811 sector 16', 'Office No 1234, Sector 17, MG Road', 'Old Faridabad Metro Station', 6, '2020-12-12', 0, 'Male' ,'B+', 'Hindi', '999999999993'),
(7, 'Simran', 'A', 'Gupta', 'House no 1811 sector 16', 'Office No 1234, Sector 17, MG Road', 'Old Faridabad Metro Station', 9, '2020-12-12', 1, 'Female', 'AB+', 'Hindi', '999999999994'),
(8, 'Juhi', 'Kumari', 'Chawla', 'House no 1811 sector 16', 'Office No 1234, Sector 17, MG Road', 'Old Faridabad Metro Station', 7, '2020-12-12', 1, 'Female', 'B+', 'Hindi', '999999999995'),
(9, 'Rani', 'Kumari', 'Mishra', 'House no 1811 sector 16', 'Office No 1234, Sector 17, MG Road', 'Old Faridabad Metro Station', 4, '2020-12-12', 1, 'Female', 'B+', 'Hindi', '999999999996'),
(10, 'Prakash', 'H', 'Chauhan', 'House no 1811 sector 16', 'Office No 1234, Sector 17, MG Road', 'Old Faridabad Metro Station', 7, '2020-12-12', 0, 'Male', 'B+', 'Hindi', '999999999997');
