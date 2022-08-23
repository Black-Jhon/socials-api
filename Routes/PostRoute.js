import express from "express";
import {
    createPost,
    deletePost,
    getPost,
    getPosts,
    getTimeLinePost,
    likePost,
    updatePost
} from "../Controllers/PostController.js";

const postRoute = express.Router();

postRoute.post("/", createPost);
postRoute.get("/:id", getPost);
postRoute.get("/", getPosts);
postRoute.put("/:id", updatePost);
postRoute.delete("/:id", deletePost);
postRoute.put("/:id/like", likePost);
postRoute.get("/:id/timeline", getTimeLinePost);

export default postRoute;
