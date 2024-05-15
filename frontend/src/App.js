import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import React from "react";
import UserBlogs from "./components/UserBlogs.js";
import BlogDetails from "./components/BlogDetails.js";
// import Login from "./components/Auth.js";
import Blog from "./components/Blog.js";
import AddBlog from "./components/AddBlog.js";
import Auth from "./components/Auth.js";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn= useSelector(state=> state.isLoggedIn)
  console.log(isLoggedIn);
  return <React.Fragment>
  <header>
    <Header/>
  </header>
  <main>
    <Routes>
      <Route path= "/auth" element={<Auth/>}  />
      <Route path= "/blog" element={<Blog/>}  />
      <Route path= "/myblogs" element={<UserBlogs/>}  />
      <Route path= "/myblogs/:id" element={<BlogDetails/>}  />
      <Route path= "/blogs/add" element={<AddBlog/>}  />
    </Routes>
  </main>
  </React.Fragment>
}

export default App;