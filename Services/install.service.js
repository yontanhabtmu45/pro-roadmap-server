// import the query function from the database module
const connect = require("../config/db.config");

// import fs module
const fs = require("fs");

// create a function to create the database
async function install() {
  // import the sql file
  const queryFile = __dirname + "/sql/initial-queries.sql";
  console.log(queryFile);

  let queries = [];
  let finalMessage = {};
  let templine = "";
  // read the sql file
  const lines = fs.readFileSync(queryFile, "utf8").split("\n");

  const executed = await new Promise((resolve, reject) => {
    // Iterate over all lines
    lines.forEach((line) => {
      if (line.trim().startsWith('--') || line.trim() === '') {
        // Skip if it's a comment or empty line
        return;
      }
      templine += line;
      if (line.trim().endsWith(';')) {
        // If it has a semicolon at the end, it's the end of the query
        // Prepare the individual query 
        const sqlQuery = templine.trim();
        // Add query to the list of queries 
        queries.push(sqlQuery);
        templine = '';
      }
    });
    resolve("Queries are added to the list");
  });

  // iterate through the queries
  for (let i = 0; i < queries.length; i++) {
    try {
      // execute the query
      const result = await connect.executeQuery(queries[i]);
      console.log("Table created");
    } catch (error) {
      finalMessage.message("Not all database are created");
    }
  }

  // prepare the final message
  if (!finalMessage.message) {
    finalMessage.message = "All tables are created";
    finalMessage.status = 200;
  } else {
    finalMessage.status = 500;
  }

  // return the final message
  return finalMessage;
}

module.exports = {
  install
};