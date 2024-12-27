const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW 
  }
},{
    timestamps: false, 
    tableName: 'users' 

});



module.exports = User;
