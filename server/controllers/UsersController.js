const { where } = require("sequelize");
const { models } = require("../db");
const { ApiError } = require("../error/ApiError");
const UserService = require("../service/UserService");

class UsersController {
  async getAll(req, res, next) {
    try {
      const users = await UserService.getALlUsers();
      return res.status(200).json(users);
    } catch (err) {
      return next(err);
    }
  }
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const user = await models.user.findOne({ where: { id } });
      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  }

  async getCustom(req, res, next) {
    try {
      const query = req.query;

      if (!query) throw new Error("Тело запроса не может быть пустым");

      const user = await models.user.findOne({ where: query });

      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const {
        telegramId,
        telegramChatId,
        username,
        firstName,
        email,
        login,
        phoneNumber,
        lastName,
      } = req.body;

      if (!body) throw new Error("Тело запроса не может быть пустым");
      if (!id) throw new Error("Параметр id является обязательным");

      await models.user.update(body, { where: { id } });
      return res.status(200);
    } catch (err) {
      return next(err);
    }
  }

  async create(req, res, next) {
    try {
      const {
        telegramId,
        telegramChatId,
        username,
        firstName,
        email,
        login,
        phoneNumber,
        lastName,
      } = req.body || {};

      const user = await models.user.create({
        telegramId,
        telegramChatId,
        username,
        firstName,
        email,
        login,
        phoneNumber,
        lastName,
        role: "ADMIN",
      });

      return res.status(200).send(user);
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new UsersController();
