module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('department', {
      id: {
        autoIncrement: true,
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      locationId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('department');
  }
};