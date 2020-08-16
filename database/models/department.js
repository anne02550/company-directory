/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => sequelize.define('department', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
},
{
  sequelize,
  tableName: 'department',
  timestamps: false
});
