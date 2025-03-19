const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Callback = sequelize.define('Callback', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    agreement: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    newsletter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true // Позволяем NULL для совместимости
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true // Позволяем NULL для совместимости
    }
  }, {
    tableName: 'callbacks',
    timestamps: true // Включаем timestamps
  });

module.exports = {Callback};