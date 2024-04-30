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
        const { patientNumber, demographic } = worker; // Destructuring for clarity
        const { firstName, address, dob, gender, bloodGroup, taluka, phoneNumber } = demographic;// Handle potential nullish values in demographic object
        const { id: talukaId } = taluka
        console.log("HERE", talukaId);

        tx.executeSql(
          'INSERT INTO demographics (patientNumber,firstName, address, dob, gender, bloodGroup, talukaId, phonenumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
          [patientNumber, firstName, address, dob, gender, bloodGroup, talukaId, phoneNumber],
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
    db.transaction((tx) => {
      fetchedForms.forEach(worker => {
        console.log("Form response", worker)
        const { formId, title, selected, formDefinition, specialisation } = worker; 
        const { id: specialisationId } = specialisation;
        const formDefJsonString = JSON.stringify(formDefinition);
        console.log("forId: " , formId)
        tx.executeSql(
          'INSERT INTO forms (formId, title, selected, formdefinition, specialisationId) VALUES (?, ?, ?, ?, ?);',
          // 'INSERT INTO forms (title) VALUES (?);',
          [formId, title, selected, formDefJsonString, specialisationId],
          // [title],

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




// Recommendation table stuff
// React.useEffect(() => {
//   const getuserinfo = API_PATHS.GET_DOCTOR_RECOMMENDATION.replace(":specialisationId", 22).replace(":talukaId", 10);
//   axios.get(getuserinfo, {
//     headers: {
//       Authorization: `Bearer ${props.authToken}`,
//       "Content-Type": "application/json",
//     },
//   }).then((response) => {
//     console.log("____________________________Recommendation table______________________________");
//     setRecommendations(response.data);
//     db.transaction((tx) => {
//       tx.executeSql(
//         'INSERT INTO field_worker (empId, talukaId, districtId) VALUES (?, ?, ?);',
//         [response.data.empId, response.data.taluka.id, response.data.taluka.district.id],
//         () => { console.log('Recommendation table saved successfully!'); },
//         (_, err) => { console.log('Failed to save recommendations:', err); }
//       );
//       tx.executeSql(
//         'SELECT * FROM field_worker',
//         [],
//         (_, result) => {   
//         console.log('Recommendation table fetched from SQLite:', result.rows._array);    
//         console.log("______________________________________________________________________");
//          },
//         (_, err) => { console.log('Failed to fetch recommendations:', err); }
//       );
//     });
//   }).catch((error) => {
//     console.error("Error fetching data:", error);
//   });
// }, [props.authToken]);
      



  if (!fieldWorkers || fieldWorkers.length === 0) {
    return <View><Text>Loading...</Text></View>;
    // <FollowupScreen/>
  }

  return <View><Text>Inside FW</Text></View>;
}

export default FieldWorkerContainer;
