import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [inputs, SetInputs] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    SetInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type = "login") => {
    try {
      const res = await axios.post(`http://localhost:5000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        cpassword: inputs.cpassword,
      });

      const data = res.data;
      console.log("This is my data");
      // console.log(data);
      // console.log(data.user._id);
      return data;
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error so that the calling code can handle it
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blog"))
        .then((result) => {
          console.log(result); // Use the result data as needed
        })
        .catch((error) => {
          // Handle errors from the sendRequest function
          console.error("Error in sendRequest:", error);
        });
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blog"))
        .then((result) => {
          console.log(result); // Use the result data as needed
        })
        .catch((error) => {
          // Handle errors from the sendRequest function
          console.error("Error in sendRequest:", error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          boxShadow={"10px 10px 20px #ccc"}
          padding={3}
          margin={"auto"}
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign={"center"}>
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="name"
              margin="normal"
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type="email"
            placeholder="email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type="password"
            placeholder="password"
            margin="normal"
          />
          {isSignup && (
            <TextField
              name="cpassword"
              onChange={handleChange}
              value={inputs.cpassword}
              placeholder="cpassword"
              margin="normal"
            />
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 3, borderRadius: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
