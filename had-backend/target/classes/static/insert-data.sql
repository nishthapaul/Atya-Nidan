USE atya_nidan_demo;

INSERT INTO `atya_nidan_demo`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644165', 'renupaul@gmail.com', 'Supervisor');
INSERT INTO `atya_nidan_demo`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644166', 'harishpaul@gmail.com', 'Supervisor');
INSERT INTO `atya_nidan_demo`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644167', 'ramkumar@gmail.com', 'FieldWorker');
INSERT INTO `atya_nidan_demo`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644168', 'ajaykumar@gmail.com', 'FieldWorker');
INSERT INTO `atya_nidan_demo`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644169', 'anirudhchaudhary@gmail.com', 'FieldWorker');
INSERT INTO `atya_nidan_demo`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644170', 'simrangupta@gmail.com', 'FieldWorker');
INSERT INTO `atya_nidan_demo`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644171', 'juhichawla@gmail.com', 'FieldWorker');
INSERT INTO `atya_nidan_demo`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644172', 'ranimishra@gmail.com', 'FieldWorker');
INSERT INTO `atya_nidan_demo`.`User` (`phone_number`, `email`, `role`) VALUES ('9650644173', 'prakashchauhan@gmail.com', 'FieldWorker');

INSERT INTO `atya_nidan_demo`.`Supervisor` (`supervisor_id`, `first_name`, `last_name`, `address`, `district_id`) VALUES ('1', 'Nishtha', 'Paul', 'House No. 1812 Sector 17', '1');
INSERT INTO `atya_nidan_demo`.`Supervisor` (`supervisor_id`, `first_name`, `last_name`, `address`, `district_id`) VALUES ('2', 'Renu', 'Paul', 'House No. 1812 Sector 17', '2');
INSERT INTO `atya_nidan_demo`.`Supervisor` (`supervisor_id`, `first_name`, `last_name`, `address`, `district_id`) VALUES ('3', 'Harish', 'Paul', 'House No. 1812 Sector 17', '3');

INSERT INTO `atya_nidan_demo`.`FieldWorker` (`fieldworker_id`, `first_name`, `last_name`, `address`, `taluka_id`, `dob`, `is_available`, `gender`) VALUES (4, 'Ram', 'Kumar', 'House no 1811 sector 16', 8, '2020-12-12', 1, 'Male');
INSERT INTO `atya_nidan_demo`.`FieldWorker` (`fieldworker_id`, `first_name`, `last_name`, `address`, `taluka_id`, `dob`, `is_available`, `gender`) VALUES (5, 'Ajay', 'Kumar', 'House no 1811 sector 16', 8, '2020-12-12', 1, 'Male');
INSERT INTO `atya_nidan_demo`.`FieldWorker` (`fieldworker_id`, `first_name`, `last_name`, `address`, `taluka_id`, `dob`, `is_available`, `gender`) VALUES (6, 'Anirudh', 'Chaudhary', 'House no 1811 sector 16', 6, '2020-12-12', 0, 'Male');
INSERT INTO `atya_nidan_demo`.`FieldWorker` (`fieldworker_id`, `first_name`, `last_name`, `address`, `taluka_id`, `dob`, `is_available`, `gender`) VALUES (7, 'Simran', 'Gupta', 'House no 1811 sector 16', 9, '2020-12-12', 1, 'Female');
INSERT INTO `atya_nidan_demo`.`FieldWorker` (`fieldworker_id`, `first_name`, `last_name`, `address`, `taluka_id`, `dob`, `is_available`, `gender`) VALUES (8, 'Juhi', 'Chawla', 'House no 1811 sector 16', 10, '2020-12-12', 1, 'Female');
INSERT INTO `atya_nidan_demo`.`FieldWorker` (`fieldworker_id`, `first_name`, `last_name`, `address`, `taluka_id`, `dob`, `is_available`, `gender`) VALUES (9, 'Rani', 'Mishra', 'House no 1811 sector 16', 11, '2020-12-12', 1, 'Female');
INSERT INTO `atya_nidan_demo`.`FieldWorker` (`fieldworker_id`, `first_name`, `last_name`, `address`, `taluka_id`, `dob`, `is_available`, `gender`) VALUES (9, 'Prakash', 'Chauhan', 'House no 1811 sector 16', 10, '2020-12-12', 0, 'Male');
