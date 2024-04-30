import * as React from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { API_PATHS } from "./constants/apiConstants";
import { init, db } from './Database/database';  
import FollowupScreen from "./screens/FollowupScreen";

const FieldWorkerContainer = (props) => {
  const [fieldWorkers, setFieldWorkers] = React.useState([]); 
  const [demographics, setDemographics] = React.useState([]);
  const [forms, setForms] = React.useState([]); 
  const [recommendations, setRecommendations] = React.useState([]); 
  const [selectedSpecialisationId, setSelectedSpecialisationId] = React.useState(null); 



  //Field worker table
  React.useEffect(() => {
    init().then(() => {
      console.log('--------------------------Starting-----------------------------------');
      console.log('Database initialized');
    }).catch(err => {
      console.log('Database initialization failed:', err);
    });

    const getuserinfo = API_PATHS.GET_USER_INFO.replace(":employeeId", props.user.empId);
    axios.get(getuserinfo, {
      headers: {
        Authorization: `Bearer ${props.authToken}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log("____________________________Field Worker table______________________________");
      setFieldWorkers(response.data);
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO field_worker (empId, talukaId, districtId) VALUES (?, ?, ?);',
          [response.data.empId, response.data.taluka.id, response.data.taluka.district.id],
          () => { console.log('Field worker saved successfully!'); },
          (_, err) => { console.log('Failed to save field worker:', err); }
        );
        tx.executeSql(
          'SELECT * FROM field_worker',
          [],
          (_, result) => {   
          console.log('Field workers fetched from SQLite:', result.rows._array);    
          console.log("______________________________________________________________________");
           },
          (_, err) => { console.log('Failed to fetch field workers:', err); }
        );
      });
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [props.authToken]);




  //Demographics table stuff
  React.useEffect(() => {
  const getuserinfo = API_PATHS.GET_USER_ALL_DETAILS.replace(":fieldworkerNumber", props.user.empId);
  axios.get(getuserinfo, {
    headers: {
      Authorization: `Bearer ${props.authToken}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    console.log("____________________________Demographics table______________________________");
    const fetchedWorkers = response.data; // Replace with actual field name
    db.transaction((tx) => {
      fetchedWorkers.forEach(worker => {
        const { patientNumber, demographic, currentFollowUpDate, fieldworkerFollowUpType, formTitle } = worker; // Destructuring for clarity
        const { firstName, middleName, lastName, address, dob, gender, bloodGroup, taluka, phoneNumber } = demographic;// Handle potential nullish values in demographic object
        const { id: talukaId } = taluka

        tx.executeSql(
          'INSERT INTO demographics (patientNumber, firstName, middleName, lastName, address, dob, gender, bloodGroup, talukaId, phoneNumber, currentFollowUpDate, fieldworkerFollowUpType, formTitle) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
          [patientNumber, firstName, middleName, lastName, address, dob, gender, bloodGroup, talukaId, phoneNumber, currentFollowUpDate, fieldworkerFollowUpType, formTitle],
          () => { console.log('Patient demographics saved successfully!'); },
          (_, err) => { console.error('Failed to save patient demographics:', err); }
        );
      });
      tx.executeSql(
        'SELECT * FROM demographics',
        [],
        (_, result) => {   
        console.log('Patient demographics fetched from SQLite:', result.rows._array);    
        console.log("______________________________________________________________________");
         },
        (_, err) => { console.log('Failed to fetch patient demographics:', err); }
      );
    });
    setDemographics(fetchedWorkers);
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });
}, [props.authToken]);




// DefaultForm table stuff
React.useEffect(() => {
  const getforminfo = API_PATHS.GET_FORMS_FOR_PATIENTS;
  axios.get(getforminfo, {
    headers: {
      Authorization: `Bearer ${props.authToken}`,
      "Content-Type": "application/json",
    },
  }).then((response) => {
    console.log("____________________________Forms table______________________________");
    setForms(response.data);
    const fetchedForms = response.data; 
    //specialisation id of default form extraction code
    let foundSelected = false;
    fetchedForms.forEach(form => {
      if (form.selected && !foundSelected) { // ensures we only trigger once for the selected form
        console.log("SELECTED ID: ", form.specialisation.id);
        setSelectedSpecialisationId(form.specialisation.id);
        foundSelected = true;
      }
    });
    db.transaction((tx) => {
      fetchedForms.forEach(worker => {
        const { formId, title, selected, formDefinition, specialisation } = worker; 
        const { id: specialisationId } = specialisation;
        const formDefJsonString = JSON.stringify(formDefinition);
        tx.executeSql(
          'INSERT INTO forms (formId, title, selected, formdefinition, specialisationId) VALUES (?, ?, ?, ?, ?);',
          [formId, title, selected, formDefJsonString, specialisationId],

          () => { console.log('Forms saved successfully!'); },
          (_, err) => { console.error('Failed to save Forms:', err); }
        );
      });
      tx.executeSql(
        'SELECT * FROM forms',
        [],
        (_, result) => {   
        console.log('Forms fetched from SQLite:', result.rows._array);    
        console.log("______________________________________________________________________");
         },
        (_, err) => { console.log('Failed to fetch forms:', err); }
      );
    });
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });
}, [props.authToken]);

  //Reccomendation table stuff
  React.useEffect(() => {
    if (selectedSpecialisationId) {
    const getuserinfo = API_PATHS.GET_DOCTOR_RECOMMENDATION.replace(":specialisationId", selectedSpecialisationId).replace(":talukaId", props.user.taluka.id);
    axios.get(getuserinfo, {
      headers: {
        Authorization: `Bearer ${props.authToken}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log("____________________________Reccomendation table______________________________");
      const fetchedRecommendations = response.data; 
      db.transaction((tx) => {
        fetchedRecommendations.forEach(worker => {
          const { phoneNumber, email, empId, firstName, specialisation, hospitalAddress, gender, taluka, dob, languageKnown1, languageKnown2, languageKnown3  } = worker; // Destructuring for clarity
          const { id: talukaId } = taluka
          const { id: specialisationId } = specialisation
  
          tx.executeSql(
            'INSERT INTO recommendations (phoneNumber, email, empId, firstName, specialisationId, hospitalAddress, gender, talukaId, dob, languageKnown1, languageKnown2, languageKnown3 ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            [phoneNumber, email, empId, firstName, specialisationId, hospitalAddress, gender, talukaId, dob, languageKnown1, languageKnown2, languageKnown3 ],
            () => { console.log('Recommendations saved successfully!'); },
            (_, err) => { console.error('Failed to save recommendations:', err); }
          );
        });
        tx.executeSql(
          'SELECT * FROM recommendations',
          [],
          (_, result) => {   
          console.log('Recommendations fetched from SQLite:', result.rows._array);    
          console.log("______________________________________________________________________");
           },
          (_, err) => { console.log('Failed to fetch recommendations:', err); }
        );
      });
      setRecommendations(fetchedRecommendations);
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });
  }
  }, [selectedSpecialisationId, props.authToken]);
      



  if (!fieldWorkers || fieldWorkers.length === 0) {
    // return <View><Text>Loading...</Text></View>;
    <FollowupScreen/>
  }

  return <View><Text>Inside FW</Text></View>;
}

export default FieldWorkerContainer;
