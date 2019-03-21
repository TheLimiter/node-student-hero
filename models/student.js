/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    handphone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'student'
  });
};
