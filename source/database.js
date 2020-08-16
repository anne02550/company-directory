var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'companydirectory'
})

connection.connect()

const getBySql = (sql) => new Promise((resolve, reject) => {
    connection.query(sql, function (err, rows, fields) {
        if (err) {
            reject(err);
        }
        resolve(rows);
    })
});

const getBySqlWithValues = (sql, values) => new Promise((resolve, reject) => {
    console.log(sql)
    console.log(values)
    connection.query(sql, values, function (err, rows, fields) {
        if (err) {
            reject(err);
        }
        resolve(rows);
    })
});

const getPersonnel = async (query) => {
    let sql = 'SELECT * FROM personnel';
    
    if(!query) {
        return await getBySql(sql);
    }
    const allowedSearchTerms = ['firstName', 'lastName', 'jobTitle', 'departmentID', 'email']
    const values = [];
    for(const key of allowedSearchTerms) {
        const value = query[key];
        if(value) {
            const condition = values.length == 0 ? "WHERE" : "AND"
            sql += ` ${condition} ${key} = ?`
            values.push(value);
        }
    }
    return await getBySqlWithValues(sql, values);
};

const addPersonnel = ({departmentId, jobTitle, firstName, lastName, email}) => new Promise((resolve, reject) => {
    const sql = "INSERT INTO personnel (departmentID, jobTitle, firstName, lastName, email) VALUES ?";
    const values = [[departmentId, jobTitle, firstName, lastName, email]];
    connection.query(sql, [values], function (err, result) {
        if (err) {
            reject(err);
        }
        resolve(result.affectedRows);
    })
});

const deletePersonnel = (id) => new Promise((resolve, reject) => {
    const sql = "DELETE FROM personnel WHERE id = ?";
    const values = [id];
    connection.query(sql, [values], function (err, result) {
        if (err) {
            reject(err);
        }
        resolve(result.affectedRows);
    })
});

module.exports = {
    getPersonnel,
    addPersonnel,
    deletePersonnel
}
