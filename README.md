# Atya-Nidan

<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/nishthapaul/Atya-Nidan/graphs/contributors"><img src="https://img.shields.io/github/contributors/nishthapaul/Atya-Nidan?style=for-the-badge" alt="Contributors"></a>
  <a href="https://github.com/nishthapaul/Atya-Nidan/network/members"><img src="https://img.shields.io/github/forks/nishthapaul/Atya-Nidan?style=for-the-badge" alt="Forks"></a>
<!--   <a href="https://github.com/nishthapaul/Atya-Nidan/commits"><img src="https://img.shields.io/github/commits/nishthapaul/Atya-Nidan?style=for-the-badge" alt="Stargazers"></a> -->
  <a href="https://github.com/nishthapaul/Atya-Nidan/issues"><img src="https://img.shields.io/github/issues/nishthapaul/Atya-Nidan?style=for-the-badge" alt="Issues"></a>
<!--   <a href="https://github.com/OpenDevin/OpenDevin/blob/main/LICENSE"><img src="https://img.shields.io/github/license/opendevin/opendevin?style=for-the-badge" alt="MIT License"></a> -->
</div>

<!-- TABLE OF CONTENTS -->
  ↪ 🗂️ Table of Contents
<!--   <ol>
    <li>
      <a href="#about-the-project">About AtyaNidan</a>
      <ul>
        <li><a href="#project-status">Project Status</a></li>
      </ul>
    </li>
    <li>
      <a href="#get-started">Get Started</a>
      <ul>
        <li><a href="#1-build-and-setup">1. Build and Setup</a></li>
        <li><a href="#2-run-the-application">2. Run the Application</a></li>
        <li><a href="#3-individual-server-startup">3. Individual Server Startup</a></li>
      </ul>
    </li>
    <li><a href="#logo">App Logo</a></li> 
    <li><a href="#Figma">Figma</a></li>
    <li><a href="#ScreenShots">Screenshots</a></li> 
  </ol> -->
<!-- </details> -->

|     | Topic                                                               |
| --- | :------------------------------------------------------------------ |
| ⛳️  | <b>Mission</b>                               |
| 🧶  | <b>Project Status</b>                                               |
| 🏁  | <b>Get Started</b>                                     |
| 💎  | <b>Design Principles</b>                     |
| 🔧  | <b>Build and Setup</b>                                   |
| 🔮  | <b>App Logo</b>                                             |
| 🧩  | <b>Figma</b>       |
| 📸  | <b>Screenshots</b> |

## ⛳️ Mission

Welcome to AtyaNidan, a project aiming improve healthcare delivery by empowering field health workers with a tablet-based application designed to extend care directly to homes. This project aspires to enhance the care process, the app assists health workers by managing their schedules and sending alerts for follow-up visits, ensuring no patient is overlooked.

<p align="right" style="font-size: 14px; color: #555; margin-top: 20px;">
    <a href="#readme-top" style="text-decoration: none; color: #007bff; font-weight: bold;">
        ↑ Back to Top ↑
    </a>
</p>

## 🤔 What is AtyaNidan?
AtyaNidan is an innovative project designed to bring healthcare services closer to communities by enabling field health workers through technology. It is a tablet-based application that supports health workers as they visit homes, conducting screenings for all family members with a standardized questionnaire. This approach aims to identify individuals with mental health conditions early and ensure they are promptly referred to local doctors for evaluation and treatment.

The application simplifies the process of recording diagnoses using ICD10 codes, making it easier for doctors to prescribe the appropriate treatment and follow-ups. It's equipped with features to help health workers manage their schedules, receive alerts for upcoming follow-ups, and ensure no patient is left behind, even in areas with unreliable internet thanks to its offline capabilities.

<p align="right" style="font-size: 14px; color: #555; margin-top: 20px;">
    <a href="#readme-top" style="text-decoration: none; color: #007bff; font-weight: bold;">
        ↑ Back to Top ↑
    </a>
</p>

## ⁉ Why AtyaNidan?
AtyaNidan is born out of the necessity to extend healthcare services beyond the confines of traditional facilities and directly into homes, particularly in underserved areas. By leveraging technology, AtyaNidan empowers health workers with tools to efficiently screen, diagnose, and ensure the follow-up of patients, fundamentally transforming how health conditions are identified and treated at the community level. This initiative not only aims to make healthcare more accessible but also ensures that it is proactive, personalized, and responsive to the needs of the community, ultimately contributing to better health outcomes and a healthier society.

<p align="right" style="font-size: 14px; color: #555; margin-top: 20px;">
    <a href="#readme-top" style="text-decoration: none; color: #007bff; font-weight: bold;">
        ↑ Back to Top ↑
    </a>
</p>

## 🧶 Project Status

AtyaNidan is currently a work in progress, but you can already run the alpha version to see the end-to-end system in action. The project team is actively working on the following key milestones:

- **UI**: Developing a user-friendly interface for doctor and feild worker interactions, including a form interface.
- **Backend**: Building Spring Boot microservices with secure OTP login (phone/email) and role-based authorization, offering separate services for authentication, (future) forms, and health (including admin APIs). 
- **Agent Capabilities**: Enhancing the admin's abilities to add doctors and field workers, assign/deassign field workers, and perform other login related tasks.

<p align="right" style="font-size: 14px; color: #555; margin-top: 20px;">
    <a href="#readme-top" style="text-decoration: none; color: #007bff; font-weight: bold;">
        ↑ Back to Top ↑
    </a>
</p>

## 🏁 Get Started

Getting started with the AtyaNidan project is incredibly easy. Follow these simple steps to set up and run AtyaNidan on your system:

### 1. Requirements
* Linux, Mac OS, or [Windows](https://learn.microsoft.com/en-us/windows/wsl/install)
* [React native](https://reactnative.dev)
* [Expo Go](https://docs.expo.dev/get-started/installation/) >= 1.0.0
* [Spring Boot](https://spring.io/projects/spring-boot)
* [My SQL](https://dev.mysql.com/downloads/installer/)
* [Kibana](https://www.elastic.co/downloads/kibana)
* [Elastic Search](https://www.elastic.co/downloads/elasticsearch)
* [Ngrok](https://ngrok.com/download)
* [Postman](https://ngrok.com/download)

IDE Requirements:
* [Android Studio](https://ngrok.com/download)
* [IntelliJ IDEA](https://www.jetbrains.com/idea/download/?section=mac)
* [VS Code](https://code.visualstudio.com/download)

### 2. 🔧 Build and Setup

- **Tablet API:** Begin by building the project, which includes setting up the environment and installing dependencies. This step ensures that AtyaNidan is ready to run smoothly on your system.
  Start by launching Android Studio > Device Manager > Pixel tablet API 34. Please verify your configurations from below screenshot.
  
  <img width="492" alt="Screenshot 2024-04-04 at 4 43 23 PM" src="https://github.com/nishthapaul/Atya-Nidan/assets/163638504/2cd357df-4b48-4a62-8cc2-d9bc6f21eabb">


### 3. ⏯️ Run the Application

- **Setup the API's:** Run all the 3 microservices (AuthServiceApplication, FormServiceApplication and HealthServiceApplication). The entry point is 9001 port of AuthServiceApp.
If frontend will run on the same laptop as backend, then it can directly use localhost:9001 as the base url.
Otherwise to run backend and frontend in different laptops, we need to expose the localhost to a public API with the help of Ngrok. It creates a tunnel between frontend and backend such that all the APIs hitting localhost:9001 will be forwarded to the exposed public URl.

    ```bash
  ngrok http http://localhost:9001/    
  ```
    <img width="686" alt="Screenshot_2024-04-04_at_5 06 39_PM" src="https://github.com/nishthapaul/Atya-Nidan/assets/163638504/0791d38d-7007-4c80-9649-376072435587">


- **Launch the App:** Once the setup is complete, launching AtyaNidan is as simple as running a single command. This command starts both the backend and frontend servers seamlessly, allowing you to interact with AtyaNidan without any hassle.
    ```bash
    npm start
    ```
    You'll see this: Logs for your project will appear below. Press Ctrl+C to exit.
   › Press a │ open Android
  
    While launching for first time use:
  ```bash
    npm i
    ```

### 4. 🪶 Individual Server Startup

- **Start the Backend Server:** If you prefer, you can start the backend server independently to focus on backend-related tasks or configurations.
    Refer: Setup the API's

- **Start the Frontend Server:** Similarly, you can start the frontend server on its own to work on frontend-related components or interface enhancements.
    Refer: Run the Application
  (Note: Since backend is not connected, you won't be able to see some of the functionalities)

<p align="right" style="font-size: 14px; color: #555; margin-top: 20px;">
    <a href="#readme-top" style="text-decoration: none; color: #007bff; font-weight: bold;">
        ↑ Back to Top ↑
    </a>
</p>

## 🔮 App Logo

<!-- PROJECT LOGO -->
<div align="center">
 <img width="237" alt="Screenshot 2024-04-04 at 5 19 44 PM" src="https://github.com/nishthapaul/Atya-Nidan/assets/163638504/038281f7-0b52-4d4b-9c60-3e4b26926bca">
</div>

## 🧩 Figma

 https://www.figma.com/file/JQUy4I0SJvftMLQCuwmUQT/AtyaNidan?type=design&node-id=1669%3A162202&mode=design&t=XlSHyEiDvNZ5A831-1

## 📸 Screenshots

#### Login Page

<img width="1003" alt="Screenshot 2024-04-04 at 5 04 54 PM" src="https://github.com/nishthapaul/Atya-Nidan/assets/163638504/d22e1fe0-3170-4af5-80f2-6811044d64a7">

#### Admin Landing Page

<img width="1002" alt="Doctor" src="https://github.com/nishthapaul/Atya-Nidan/assets/163638504/55897bc4-68d1-4097-8e8c-4bf87559f8fc">


<p align="right" style="font-size: 14px; color: #555; margin-top: 20px;">
    <a href="#readme-top" style="text-decoration: none; color: #007bff; font-weight: bold;">
        ↑ Back to Top ↑
    </a>
</p>

[contributors-shield]: https://img.shields.io/github/contributors/opendevin/opendevin?style=for-the-badge
[contributors-url]: https://github.com/OpenDevin/OpenDevin/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/opendevin/opendevin?style=for-the-badge
[forks-url]: https://github.com/OpenDevin/OpenDevin/network/members
[stars-shield]: https://img.shields.io/github/stars/opendevin/opendevin?style=for-the-badge
[stars-url]: https://github.com/OpenDevin/OpenDevin/stargazers
[issues-shield]: https://img.shields.io/github/issues/opendevin/opendevin?style=for-the-badge
[issues-url]: https://github.com/OpenDevin/OpenDevin/issues
[license-shield]: https://img.shields.io/github/license/opendevin/opendevin?style=for-the-badge
[license-url]: https://github.com/OpenDevin/OpenDevin/blob/main/LICENSE
