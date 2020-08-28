"use strict";
const crypto = require("crypto");

const secretKey = crypto.randomBytes(32).toString("hex");

const { Model } = require("sequelize");
const { Sequelize } = require(".");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      username: { type: DataTypes.STRING, unique: true },
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
      encryptionKey: { type: DataTypes.STRING, defaultValue: secretKey },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
