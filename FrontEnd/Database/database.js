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
          middleName TEXT,
          lastName TEXT NOT NULL,
          address TEXT NOT NULL,
          dob DATE NOT NULL,
          gender TEXT NOT NULL,
          bloodGroup TEXT NOT NULL,
          talukaId INT NOT NULL,
          talukaName TEXT NOT NULL,
          phoneNumber TEXT NOT NULL,
          currentFollowUpDate DATE,
          fieldworkerFollowUpType TEXT,
          formTitle TEXT NOT NULL,
          submittedOn TEXT,
          pdfStorageContent TEXT
        );`, [], null, (_, err) => reject(err)
      );

      tx.executeSql('DROP TABLE IF EXISTS forms;', [], null, (_, err) => reject(err));
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS forms (
          title TEXT PRIMARY KEY NOT NULL,
          formId INT NOT NULL,
          selected INT NOT NULL,
          formDefinition TEXT NOT NULL,
          specialisationId INT NOT NULL,
          specialisationName TEXT NOT NULL
        );`, [], null, (_, err) => reject(err)
      );

      tx.executeSql('DROP TABLE IF EXISTS formResponseforPatient;', [], null, (_, err) => reject(err));
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS formResponseforPatient (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          formId INTEGER,
          fwNumber TEXT,
          pNumber TEXT,
          fName TEXT,
          mName TEXT,
          lName TEXT,
          age INTEGER,
          unhealthy INTEGER,
          gender TEXT,
          bloodGroup TEXT,
          address TEXT,
          responseList TEXT,
          consent INTEGER,
          talukaName TEXT,
          phoneNumber TEXT,
          formType TEXT NOT NULL,
          aabhaNumber TEXT
        );
        `, [], null, (_, err) => reject(err)
      );

      tx.executeSql('DROP TABLE IF EXISTS recommendations;', [], null, (_, err) => reject(err));
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS recommendations (
          phoneNumber TEXT PRIMARY KEY NOT NULL,
          email TEXT,
          empId TEXT NOT NULL,
          firstName TEXT NOT NULL,
          middleName TEXT,
          lastName TEXT NOT NULL,
          specialisationId INT NOT NULL,
          hospitalAddress TEXT NOT NULL,
          gender TEXT,
          talukaId INT NOT NULL,
          dob DATE,
          languageKnown1 TEXT,
          languageKnown2 TEXT,
          languageKnown3 TEXT
        );`, [], 
        () => resolve(), // Resolve after all tables are assured to be created
        (_, err) => reject(err)
      );
    });
  });
};
