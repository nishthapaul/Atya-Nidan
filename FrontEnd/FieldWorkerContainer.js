import * as React from "react";
import { View, Text } from "react-native";
import axios from "axios";
import { API_PATHS } from "./constants/apiConstants";
import { init, db } from './Database/database';  // Make sure to import db here

const FieldWorkerContainer = (props) => {
  const [admin, setAdmin] = React.useState([]);

  React.useEffect(() => {
    init().then(() => {
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
      console.log("response", response);
      setAdmin(response.data);
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO field_worker (empId) VALUES (?);',
          [response.data.empId],
          () => { console.log('Field worker saved successfully!'); },
          (_, err) => { console.log('Failed to save field worker:', err); }
        );
      });
    }).catch((error) => {
      console.error("Error fetching data:", error);
    });

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM field_worker',
        [],
        (_, result) => { console.log('Field workers fetched from SQLite:', result.rows._array); },
        (_, err) => { console.log('Failed to fetch field workers:', err); }
      );
    });
  }, [props.authToken]);

  if (!admin || admin.length === 0) {
    return <View><Text>Loading...</Text></View>;
  }

  return <View><Text>Inside FW</Text></View>;
}

export default FieldWorkerContainer;
