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
      console.log("Received demographic data", demographicsResponse.data);
      await db.transaction(async(tx) => {
        console.log(demographicsResponse);
        demographicsResponse.data.forEach(worker => {
          console.log("Adding patient: ", worker.demographic.firstName);
          tx.executeSql('INSERT INTO demographics (patientNumber, firstName, middleName, lastName, address, dob, gender, bloodGroup, talukaId, talukaName, phoneNumber, currentFollowUpDate, fieldworkerFollowUpType, formTitle, pdfStorageContent, submittedOn) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
          [worker.patientNumber, worker.demographic.firstName, worker.demographic.middleName, worker.demographic.lastName, worker.demographic.address, worker.demographic.dob, worker.demographic.gender, worker.demographic.bloodGroup, worker.demographic.taluka.id, worker.demographic.taluka.name, worker.demographic.phoneNumber, worker.currentFollowUpDate, worker.fieldworkerFollowUpType, worker.formTitle, worker.pdfStorage.content, worker.submittedOn], (tx, results) => {
            console.log("_____________________________");
            console.log("hereeee")
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
        formsResponse.data.forEach(form => {
          console.log("form added: ", form.title);
          console.log("_____________________________");

          if(form.selected){
          console.log("form selected: ", form.title);}
          if (form.selected) setSelectedSpecialisationId(form.specialisation.id);
          tx.executeSql('INSERT INTO forms (formId, title, selected, formDefinition, specialisationId, specialisationName) VALUES (?, ?, ?, ?, ?, ?);',
            [form.formId, form.title, form.selected ? 1 : 0, JSON.stringify(form.formDefinition), form.specialisation.id, form.specialisation.name], (tx, results) => {
              console.log("_____________________________");
              console.log("formss ")
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                console.log('Forms Inserted Successfully!');
              } else {
                console.log('Failed to Insert Forms');
              }
            });
          });
        });
      // const formsResponse = await axios.get(API_PATHS.GET_FORMS_FOR_PATIENTS, { headers });
      // await db.transaction(async (tx) => {
      //   for (const form of formsResponse.data) {
      //     console.log("form added: ", form.title);
      //     console.log("_____________________________");

      //     if(form.selected){
      //     console.log("form selected: ", form.title);}
      //     if (form.selected) setSelectedSpecialisationId(form.specialisation.id);
      //     await executeSqlAsync(tx, 'INSERT INTO forms (formId, title, selected, formDefinition, specialisationId, specialisationName) VALUES (?, ?, ?, ?, ?, ?);',
      //       [form.formId, form.title, form.selected ? 1 : 0, JSON.stringify(form.formDefinition), form.specialisation.id, form.specialisation.name]);
      //   }
      // });
    } catch (error) {
      console.error("Fetching error:", error);
    }
  };

      useEffect(() => {
        const fetchRecommendations = async () => {
          try {
            const headers = {
              Authorization: `Bearer ${props.authToken}`,
              "Content-Type": "application/json",
            };
            if (selectedSpecialisationId) {
              console.log("Selected specialization: ", selectedSpecialisationId);
              console.log("taluka id: ", props.user.taluka.id);
              const recommendationsResponse = await axios.get(API_PATHS.GET_DOCTOR_RECOMMENDATION.replace(":specialisationId", selectedSpecialisationId).replace(":talukaId", props.user.taluka.id), { headers });
              await db.transaction(async(tx) => {
                recommendationsResponse.data.forEach(worker => {
                  console.log("recommendation workers", worker);
                  console.log("_____________________________");
                  tx.executeSql('INSERT INTO recommendations (phoneNumber, email, empId, firstName, middleName, lastName, specialisationId, hospitalAddress, gender, talukaId, dob, languageKnown1, languageKnown2, languageKnown3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
                  [worker.phoneNumber, worker.email, worker.empId, worker.firstName, worker.middleName, worker.lastName, worker.specialisation.id, worker.hospitalAddress, worker.gender, worker.taluka.id, worker.dob, worker.languageKnown1, worker.languageKnown2, worker.languageKnown3],  (tx, results) => {
                    console.log("hereeee")
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                      console.log('Recommendations Inserted Successfully!');
                    } else {
                      console.log('Failed to Insert Data');
                    }
                  });
                });
              });
            }
          } catch (error) {
            console.error("Fetching error:", error);
          }
        };
      
        fetchRecommendations();
      }, [selectedSpecialisationId, props.user.taluka.id]);
      

      // if (selectedSpecialisationId) {
      //   const recommendationsResponse = await axios.get(API_PATHS.GET_DOCTOR_RECOMMENDATION.replace(":specialisationId", selectedSpecialisationId).replace(":talukaId", props.user.taluka.id), { headers });
      //   await db.transaction(async(tx) => {
      //     recommendationsResponse.data.forEach(worker => {
      //       console.log("recommendation workers", worker);
      //       console.log("_____________________________");
      //       tx.executeSql('INSERT INTO recommendations (phoneNumber, email, empId, firstName, middleName, lastName, specialisationId, hospitalAddress, gender, talukaId, dob, languageKnown1, languageKnown2, languageKnown3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
      //       [worker.recommendation.phoneNumber, worker.recommendation.email, worker.recommendation.empId, worker.recommendation.firstName, worker.recommendation.middleName, worker.recommendation.lastName, worker.recommendation.specialisation.id, worker.recommendation.hospitalAddress, worker.recommendation.gender, worker.recommendation.taluka.id, worker.recommendation.dob, worker.recommendation.languageKnown1, worker.recommendation.languageKnown2, worker.recommendation.languageKnown3],  (tx, results) => {
      //         console.log("hereeee")
      //         console.log('Results', results.rowsAffected);
      //         if (results.rowsAffected > 0) {
      //           console.log('Recommendations Inserted Successfully!');
      //         } else {
      //           console.log('Failed to Insert Data');
      //         }
      //       });
      //     });
      //   });
      // }
    

  if (isLoading) {
    return <View><Text>Loading...</Text></View>;
  }

  return <FollowupScreen user = {props.user}/>;
};

export default FieldWorkerContainer;
