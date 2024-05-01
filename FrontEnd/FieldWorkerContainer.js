import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import { API_PATHS } from './constants/apiConstants';
import { init, db } from './Database/database';  
import FollowupScreen from './screens/FollowupScreen';

const FieldWorkerContainer = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSpecialisationId, setSelectedSpecialisationId] = useState(null);

  // Utility function to handle SQL execution within a transaction
  const executeSqlAsync = (tx, sql, params = []) => {
    return new Promise((resolve, reject) => {
      tx.executeSql(sql, params, (_, result) => resolve(result), (_, error) => reject(error));
    });
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        await init();
        console.log('Database initialized');
        await fetchData();
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, [props.authToken]);  // Dependency array includes authToken to re-run when authToken changes

  const fetchData = async () => {
    const headers = {
      Authorization: `Bearer ${props.authToken}`,
      "Content-Type": "application/json",
    };

    try {
      // Fetch field worker data
      const userInfoResponse = await axios.get(API_PATHS.GET_USER_INFO.replace(":employeeId", props.user.empId), { headers });
      await db.transaction(async (tx) => {
        await executeSqlAsync(tx, 'INSERT INTO field_worker (empId, talukaId, districtId) VALUES (?, ?, ?);', 
          [userInfoResponse.data.empId, userInfoResponse.data.taluka.id, userInfoResponse.data.taluka.district.id]);
      });

      // Fetch demographic data
      const demographicsResponse = await axios.get(API_PATHS.GET_USER_ALL_DETAILS.replace(":fieldworkerNumber", props.user.empId), { headers });
      // await db.transaction(async (tx) => {
      //   console.log("demographicsResponse.data.len: ", demographicsResponse.data.length)
      //   for (const worker of demographicsResponse.data) {
      //     console.log("----------------------------")
      //     console.log(worker);
      //     await executeSqlAsync(tx, 'INSERT INTO demographics (patientNumber, firstName, middleName, lastName, address, dob, gender, bloodGroup, talukaId, phoneNumber, currentFollowUpDate, fieldworkerFollowUpType, formTitle) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      //       [worker.patientNumber, worker.demographic.firstName, worker.demographic.middleName, worker.demographic.lastName, worker.demographic.address, worker.demographic.dob, worker.demographic.gender, worker.demographic.bloodGroup, worker.demographic.taluka.id, worker.demographic.phoneNumber, worker.currentFollowUpDate, worker.fieldworkerFollowUpType, worker.formTitle]);
      //   }
      // });
      await db.transaction(async(tx) => {
        demographicsResponse.data.forEach(worker => {
          console.log("Adding patient: ", worker.demographic.firstName);
          tx.executeSql('INSERT INTO demographics (patientNumber, firstName, middleName, lastName, address, dob, gender, bloodGroup, talukaId, phoneNumber, currentFollowUpDate, fieldworkerFollowUpType, formTitle, pdfStorageContent, submittedOn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [worker.patientNumber, worker.demographic.firstName, worker.demographic.middleName, worker.demographic.lastName, worker.demographic.address, worker.demographic.dob, worker.demographic.gender, worker.demographic.bloodGroup, worker.demographic.taluka.id, worker.demographic.phoneNumber, worker.currentFollowUpDate, worker.fieldworkerFollowUpType, worker.formTitle, worker.pdfStorage.content, worker.submittedOn], (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              console.log('Data Inserted Successfully!');
            } else {
              console.log('Failed to Insert Data');
            }
          });
        });
      });

      // Fetch form data
      const formsResponse = await axios.get(API_PATHS.GET_FORMS_FOR_PATIENTS, { headers });
      await db.transaction(async (tx) => {
        for (const form of formsResponse.data) {
          console.log("form added: ", form.title);
          if (form.selected) setSelectedSpecialisationId(form.specialisation.id);
          await executeSqlAsync(tx, 'INSERT INTO forms (formId, title, selected, formDefinition, specialisationId) VALUES (?, ?, ?, ?, ?);',
            [form.formId, form.title, form.selected ? 1 : 0, JSON.stringify(form.formDefinition), form.specialisation.id]);
        }
      });

      // Fetch recommendation data conditionally
      if (selectedSpecialisationId) {
        const recommendationsResponse = await axios.get(API_PATHS.GET_DOCTOR_RECOMMENDATION.replace(":specialisationId", selectedSpecialisationId).replace(":talukaId", props.user.taluka.id), { headers });
        await db.transaction(async (tx) => {
          for (const recommendation of recommendationsResponse.data) {
            await executeSqlAsync(tx, 'INSERT INTO recommendations (phoneNumber, email, empId, firstName, specialisationId, hospitalAddress, gender, talukaId, dob, languageKnown1, languageKnown2, languageKnown3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
              [recommendation.phoneNumber, recommendation.email, recommendation.empId, recommendation.firstName, recommendation.specialisation.id, recommendation.hospitalAddress, recommendation.gender, recommendation.taluka.id, recommendation.dob, recommendation.languageKnown1, recommendation.languageKnown2, recommendation.languageKnown3]);
          }
        });
      }
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

  if (isLoading) {
    return <View><Text>Loading...</Text></View>;
  }

  return <FollowupScreen />;
};

export default FieldWorkerContainer;
