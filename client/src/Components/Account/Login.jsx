import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, styled, TextField, Typography } from "@mui/material";

import { API } from "../../services/api";
import { DataContext } from "../../context/DataProvider";

// Styles ---

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgba(0 0 0/0.6);
`;

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  height: 48px;
  border-radius: 5px;
`;

const Text = styled(Typography)`
  font-size: 14px;
  color: #878787;
`;

const SignUpButton = styled(Button)`
  text-transform: none;
  height: 48px;
  border-radius: 5px;
  background: #fff;
  color: #2874f0;
  box-shadow: 0 2px 4px 0 rgba(0 0 0/20%);
`;

const Error = styled(Typography)`
  font-size: 12px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font: 600;
`;

const loginInitalData = {
  username: "",
  password: "",
};

const signInitialData = {
  name: "",
  username: "",
  password: "",
};
const Login = ({ setIsAuthenticated }) => {
  const [toggleAcc, setToggleAcc] = useState("login");
  const [signupData, setSignupData] = useState(signInitialData);
  const [loginData, setLoginData] = useState(loginInitalData);
  const [error, setError] = useState("");
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const onToggle = () => {
    setToggleAcc(toggleAcc === "login" ? "signup" : "login");
  };

  const signupHandleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const loginHandleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const handleSignUp = async () => {
    try {
      let response = await API.userSignUp(signupData);
      console.log(response);

      if (response.isSuccess) {
        setError("");
        setSignupData(signInitialData);
        setToggleAcc("login");
      } else {
        setError(response.msg || "Something went wrong!");
      }
    } catch (err) {
      setError("An unexpected error occurred!");
      console.error(err);
    }
  };

  const handleLogin = async () => {
    const response = await API.userLogin(loginData);
    if (response.isSuccess) {
      setError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        username: response.data.username,
        name: response.data.name,
      });
      navigate("/");
      setIsAuthenticated(true);
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="Logo" />
        {toggleAcc === "login" ? (
          <Wrapper>
            <TextField
              label="Enter Username"
              name="username"
              value={loginData.username}
              onChange={(e) => loginHandleChange(e)}
              variant="standard"
            />
            <TextField
              label="Enter Password"
              name="password"
              value={loginData.password}
              onChange={(e) => loginHandleChange(e)}
              variant="standard"
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={() => handleLogin()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignUpButton onClick={() => onToggle()}>
              Create An Account
            </SignUpButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              label="Enter Name"
              variant="standard"
              name="name"
              onChange={(e) => signupHandleChange(e)}
            />
            <TextField
              label="Enter Username"
              variant="standard"
              name="username"
              onChange={(e) => signupHandleChange(e)}
            />
            <TextField
              label="Enter Password"
              variant="standard"
              name="password"
              onChange={(e) => signupHandleChange(e)}
            />
            {error && <Error>{error}</Error>}
            <SignUpButton onClick={() => handleSignUp()}>SignUp</SignUpButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => onToggle()}>
              Already Have An Account?
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
