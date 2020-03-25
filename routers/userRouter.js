import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  changePassward
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassward, changePassward);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;
