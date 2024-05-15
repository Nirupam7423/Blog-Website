import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

const UserBlogs = () => {
  const [blogs, setblogs] = useState([]);
  const [user, setUser] = useState([]);

  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    console.log("User id is;", id);
    const res = await axios
      .get(`http://localhost:5000/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data.user;
    console.log("MY id's data is:", data._id);
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) =>
      // console.log("My DATA IS ", data)
      // setblogs(data.blogs.blogs
      setUser(data)
    );
  }, []);

  // console.log(user);

  return (
    // <div>
    //   This is my blog(userBlogs)
    // </div>
    <div>
      {/* {console.log(newblogs[0])} */}
      {/* {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          data={blog}
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          userName={blog.user.name}
        />
      ))} */}
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <BlogCard
            key={index}
            isUser={true}
            data={blog}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
            id={blog._id}
          />
        ))}
      {/* <BlogCard title={blog.title} description={blog.description} imageURL={blog.imageURL} userName={blog.user.name} /> */}
    </div>
  );
};

export default UserBlogs;
