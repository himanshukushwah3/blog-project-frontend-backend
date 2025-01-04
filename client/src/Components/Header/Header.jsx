import React from "react";
import { Link } from "react-router-dom";
import { AppBar, styled, Toolbar } from "@mui/material";
const Component = styled(AppBar)`
  background: #fff;
  color: #000;
`;

const Container = styled(Toolbar)`
  justify-content: center;
  & > a {
    padding: 20px;
    color: inherit;
    text-decoration: none;
  }
`;

const Header = () => {
  return (
    <Component>
      <Container>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/login"}>Logout</Link>
      </Container>
    </Component>
  );
};

export default Header;
