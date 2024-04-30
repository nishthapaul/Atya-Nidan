import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("app.db");

export const init = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('DROP TABLE IF EXISTS field_worker;', [], null, (_, err) => reject(err));
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS field_worker (
          empId TEXT PRIMARY KEY NOT NULL,
          talukaId INT NOT NULL,
          districtId INT NOT NULL
        );`, [], null, (_, err) => reject(err)
      );

      tx.executeSql('DROP TABLE IF EXISTS demographics;', [], null, (_, err) => reject(err));
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS demographics (
          patientNumber TEXT PRIMARY KEY NOT NULL,
          firstName TEXT NOT NULL,
          address TEXT NOT NULL,
          dob DATE NOT NULL,
          gender TEXT NOT NULL,
          bloodGroup TEXT NOT NULL,
          talukaid INT NOT NULL,
          phonenumber TEXT NOT NULL
        );`, [], null, (_, err) => reject(err)
      );

      tx.executeSql('DROP TABLE IF EXISTS forms;', [], null, (_, err) => reject(err));
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS forms (
          title TEXT PRIMARY KEY NOT NULL,
          formId INT NOT NULL,
          selected INT NOT NULL,
          formDefinition TEXT NOT NULL,
          specialisationId INT NOT NULL
        );`, [], 
        () => resolve(), // Resolve after all tables are assured to be created
        (_, err) => reject(err)
      );
    });
  });
};
