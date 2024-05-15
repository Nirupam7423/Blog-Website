import express from "express";
import { addBlog, deleteblog, getallblog, getbyid, getbyuserId, updateBlog } from "../controller/Blog_controller.js";

const Blogrouter = express.Router();

Blogrouter.get("/", getallblog);
Blogrouter.post("/addblog", addBlog);
Blogrouter.put("/updateBlog/:id", updateBlog);
Blogrouter.get("/:id", getbyid);
Blogrouter.delete("/:id", deleteblog);
Blogrouter.get("/user/:id",getbyuserId)
export default Blogrouter;