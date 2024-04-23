import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("app.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DROP TABLE field_worker;`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS field_worker (
          empId TEXT PRIMARY KEY NOT NULL
        );`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
