/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => sequelize.define('location', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
},
{
  sequelize,
  tableName: 'location',
  timestamps: false
});
