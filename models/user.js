const db = require("../config/db");

const userIsExist = (email) => {
  const query = `SELECT * FROM table_user WHERE email='${email}'`;
  return db.execute(query);
};

const insertNewUser = (email, password) => {
  const query = `INSERT INTO table_user (email, password) 
                  VALUES ('${email}', '${password}')`;
  return db.execute(query);
};

module.exports = {
  userIsExist,
  insertNewUser,
};
