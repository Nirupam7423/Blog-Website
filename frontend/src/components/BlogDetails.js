import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetails = () => {
  const [blog, setBlog] = useState();
  const { id } = useParams();
  console.log("id is ", id);
  const [inputs, SetInputs] = useState();

  const handleChange = (e) => {
    SetInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    // console.log("My id is :", id);
    const res = await axios
      .get(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));

    const data = await res.data.blog;
    // console.log("My id data is", data);
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      console.log("Inside datas are ", data);
      setBlog(data);
      SetInputs({
        Title: data.title,
        Description: data.description,
      });
    });
  }, [id]);
  const sendRequest = async () => {
    const res = axios
      .put(`http://localhost:5000/api/blog/updateBlog/${id}`, {
        Title: inputs.title,
        Description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log("After Updating ", data);
    return data;
  };
  // console.log(blog);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data) => console.log(data));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor={"green"}
            borderRadius={5}
            boxShadow={"10px 10px 20px #ccc"}
            padding={3}
            margin={"auto"}
            marginTop={3}
            display={"flex"}
            flexDirection={"column "}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              variant="h2"
              textAlign={"center"}
            >
              Post Your Blog
            </Typography>
            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
            >
              Title
            </InputLabel>
            <TextField
              name="Title"
              onChange={handleChange}
              value={inputs.Title}
              margin="normal"
              variant="outlined"
            />
            <InputLabel sx={labelStyle}>Description</InputLabel>
            <TextField
              name="Description"
              onChange={handleChange}
              value={inputs.Description}
              margin="normal"
              variant="outlined"
            />

            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};
export default BlogDetails;
