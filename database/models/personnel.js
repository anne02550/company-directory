/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => sequelize.define('personnel', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    jobTitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
},
{
  sequelize,
  tableName: 'personnel',
  timestamps: false
});
