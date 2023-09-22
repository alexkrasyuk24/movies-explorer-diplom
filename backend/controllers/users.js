const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ConflictError = require("../errors/ConflictError");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError ");
const { CREATED_CODE } = require("../utils/constants");
const { SICRET_KEY_SERVER_DEV } = require("../utils/constants");

const { NODE_ENV, SICRET_KEY_SERVER } = process.env;

// Получение данных пользователя
const getUserInfo = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError("Пользователь по указанному _id не найден");
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Запрашиваемый пользователь не найден"));
      } else {
        next(err);
      }
    });
};

// Регистрация пользователя
const registrationUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        email: req.body.email,
        password: hash,
        name: req.body.name,
      })
    )
    .then((user) =>
      res.status(CREATED_CODE).send({
        email: user.email,
        name: user.name,
        _id: user._id,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Такой пользователь уже существует"));
      } else if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            "Переданы некорректные данные при создании пользователя"
          )
        );
      } else {
        next(err);
      }
    });
};

// Логин пользователя
const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Создание JWT-токена
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? SICRET_KEY_SERVER : SICRET_KEY_SERVER_DEV,
        { expiresIn: "7d" }
      );
      res.send({ token });
    })
    .catch(next);
};

//  Редактирование данных пользователя
const handleEditorUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(() => {
      throw new NotFoundError("Пользователь с указанным _id не найден");
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Такой пользователь уже существует"));
      } else if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            "Переданы некорректные данные при обновлении профиля"
          )
        );
      } else {
        next(err);
      }
    });
};

module.exports = {
  registrationUser,
  loginUser,
  getUserInfo,
  handleEditorUserInfo,
};
