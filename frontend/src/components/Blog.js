import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const Blog = () => {
  const [newblogs, setBlogs] = useState([]);
  // let newblogs = [];
  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog");
      // console.log("This is my res")
      // console.log(res)
      // res = await res.json();

      const data = res.data.blog;
      // console.log("The data is :", data[0]._id);
      // const data = res.blog
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      // console.log("Ha");
      // //console.log(data.isArray);
      setBlogs(data);
    });
  }, []);

  // const myuserid = localStorage.getItem("userId") === blog.user._id;
  // console.log("myuserid is ", myuserid);
  console.log("new Blogs are ", newblogs);
  // console.log(blogs);
  // console.log("Blogs is array or not")
  // console.log(Array.isArray(blogs))
  // newblogs.json();
  // console.log("my title is ", newblogs[0].title);
  return (
    <div>
      {/* {console.log(newblogs[0])} */}
      {newblogs.map((blog, index) => (
        <BlogCard
          id={blog._id}
          isUser={localStorage.getItem("userId") === blog.user}
          key={index}
          data={blog}
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          userName={blog.user.name}
        />
      ))}
      {/* <BlogCard title={blog.title} description={blog.description} imageURL={blog.imageURL} userName={blog.user.name} /> */}
    </div>
  );
};

export default Blog;
