import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import axios from "axios";

import React, { useState } from "react";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const AddBlog = () => {
  const [inputs, SetInputs] = useState({
    Title: "",
    Description: "",
    ImageURL: "",
  });

  const handleChange = (e) => {
    SetInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const SendReqquest = async () => {
    const res = await axios
      .post(`http://localhost:5000/api/blog/addblog`, {
        title: inputs.Title,
        description: inputs.Description,
        image: inputs.ImageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    SendReqquest()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
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
          <InputLabel sx={labelStyle}>ImageURL</InputLabel>
          <TextField
            name="ImageURL"
            onChange={handleChange}
            value={inputs.ImageURL}
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
    </div>
  );
};

export default AddBlog;
