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

const getPersonnel = async () => await getBySql('SELECT * FROM personnel');

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

module.exports = {
    getPersonnel,
    addPersonnel
}