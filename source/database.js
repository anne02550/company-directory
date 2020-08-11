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

module.exports = {
    getPersonnel
}