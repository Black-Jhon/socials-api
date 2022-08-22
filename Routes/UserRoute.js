import express from "express";
import {deleteUser, followUser, getUser, getUsers, unFollowUser, updateUser} from "../Controllers/UserController.js";

const userRoute = express.Router();

userRoute.get("/:id", getUser);
userRoute.get("/", getUsers);
userRoute.put("/:id", updateUser);
userRoute.delete("/:id", deleteUser);
userRoute.put("/:id/follow", followUser);
userRoute.put("/:id/unfollow", unFollowUser);

export default userRoute;
