use atya_nidan;

INSERT INTO State(name) VALUES('Punjab'), ('Bihar'), ('Gujarat'), ('West Bengal'), ('Karnataka');

INSERT INTO User(phone_number, email, role) VALUES
('9650644207', 'vivek@gmail.com', 'SuperAdmin'),
('9650644208', 'ram@gmail.com', 'SuperAdmin'),
('9650644209', 'jaspreet@gmail.com', 'SuperAdmin'),
('9650644210', 'ajay@gmail.com', 'SuperAdmin'),
('9650644211', 'prateek@gmail.com', 'SuperAdmin'),
('9650644212', 'prabal@gmail.com', 'SuperAdmin'),
('9650644213', 'bheemappa@gmail.com', 'SuperAdmin');

INSERT INTO Super_Admin(super_admin_id, first_name, middle_name, last_name, address, state_id, dob) VALUES
(42, 'Vivek', 'Ram', 'Chavan', 'Neelkanth office sector 62, Chandigarh', 1, '1990-05-09'),
(43, 'Ram', NULL, 'Sharma', '10/21, Near Kalkaji Police Station, Kalkaji Extn', 2, '1991-06-19'),
(44, 'Jaspreet', 'Dev', 'Singh', '30, Haria I E, Off L B S Marg, Majiwada', 3, '1992-10-19'),
(45, 'Ajay', 'Pratap', 'Mishra', '38/40/8, A, Thakurdwar Road, Thakurdwar', 4, '1989-04-09'),
(46, 'Prateek', 'Krishna', 'Pathak', '57, Lisha Park, H T Line Road, Subhanpura', 5, '1988-12-29'),
(47, 'Prabal', NULL, 'Mukherjee', '140, Shanthi Vihar Complex, Royapettah High Road', 6, '1987-02-14'),
(48, 'Bheemappa', 'Sri', 'Bhat', '28, 2nd Main, Opp Govt High School ', 7, '1987-08-24');




