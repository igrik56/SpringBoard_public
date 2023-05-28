const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

function sqlForPartialUpdate(dataToUpdate, jsToSql) {                     //dateToUpdate is and object to convert, jsToSql is an object of column names that
  const keys = Object.keys(dataToUpdate);                                 //correspond to column names in SQL.
  if (keys.length === 0) throw new BadRequestError("No data");            //throw error if dataToUpdate is empty

  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  const cols = keys.map((colName, idx) =>                                 //convert object to array: 'colName': 'value' -> ['"colName"=$n', '"colName"=$n']
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,                     //where colName is the Key of object plus the index number of the value that
  );                                                                      //belongs to that key. It is done to sanitize inputs for sql.

  return {
    setCols: cols.join(", "),                                             //Join all keys on ', ' to create an array of all inputs that will look like "first_name"=$1', '"age"=$2'
    values: Object.values(dataToUpdate),                                  //all values of the original object are sent in order 
  };
}

module.exports = { sqlForPartialUpdate };
