const isProduction = process.env.DATABASE_URL != null;

const productionConfig = {
  dialect: 'postgres',
  dialectOptions: {
    connectionString: process.env.DATABASE_URL
  }
}

const localConfig = {
    username: 'root',
    password: '12345678',
    database: 'companydirectory',
    host: '127.0.0.1',
    dialect: 'mysql'
};

module.exports = () => {
  return isProduction ? productionConfig : localConfig;
};