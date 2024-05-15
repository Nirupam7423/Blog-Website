import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getallblog = async (req, res, next) => {
  // console.log("hello");
  let blog;
  try {
    blog = await Blog.find();
    // .populate('user');
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "Blog Not Found" });
  }
  // console.log("checking in backend Blogs is array or not")
  //   console.log(Array.isArray(blog))
  return res.status(200).json({ blog });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existuser;
  try {
    existuser = await User.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!existuser) {
    res.status(404).json({ message: "Unable to find the user with this id" });
  }
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existuser.blogs.push(blog);
    await existuser.save({ session });
    await session.commitTransaction();
    // await blog.save();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
  res.status(201).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  let Blogid = req.params.id;
  console.log("hello");
  console.log(Blogid);
  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(Blogid, {
      title,
      description,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: "Internal Server Error" });
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update the blog" });
  }
  return res.status(200).json({ blog });
};

export const getbyid = async (req, res, next) => {
  let id = req.params.id;
  let blog;

  try {
    blog = await Blog.findById(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  if (!blog) {
    return res.status(404).json({ message: "Blog not foung" });
  }
  return res.status(200).json({ blog });
};

export const deleteblog = async (req, res, next) => {
  let id = req.params.id;
  let blog;

  try {
    blog = await Blog.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  if (!blog) {
    return res.status(404).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "deleted successfully" });
};

export const getbyuserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ user: userBlogs });
};
