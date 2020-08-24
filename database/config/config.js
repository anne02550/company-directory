const config = {
    username: process.env.db_username || 'root',
    password: process.env.db_password ||'12345678',
    database: process.env.db_name || 'companydirectory',
    host: process.env.db_host || '127.0.0.1',
    dialect: process.env.db_dialect || 'mysql'
};

module.exports = config;