module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('personnel', {
      id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      jobTitle: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: true
      },
      departmentId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('personnel');
  }
};
