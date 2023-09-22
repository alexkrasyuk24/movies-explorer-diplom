const userRouter = require("express").Router();

const { handleEditorUserInfoValidator } = require("../middlewares/validation");

const { getUserInfo, handleEditorUserInfo } = require("../controllers/users");

userRouter.get("/users/me", getUserInfo);

userRouter.patch(
  "/users/me",
  handleEditorUserInfoValidator,
  handleEditorUserInfo
);

module.exports = userRouter;
