const { DataTypes } = require('sequelize');
const sequelize = require('@r/config/database');

const User = sequelize.define(
  'User',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Column is required
      unique: true, // Ensure unique emails
      validate: {
        isEmail: true, // Validate that the input is a valid email
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Column is required
    },
  },
  {
    // tableName: 'users', // default
    timestamps: true,
  }
);

module.exports = { User };
