import React from "react";
import { Box, Typography, styled } from "@mui/material";

import banner from "../../assets/home-banner.jpg";
const Image = styled(Box)`
  background: url(${banner}) center/100% no-repeat #000;
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Heading = styled(Typography)`
  font-size: 70px;
  font-weight: bold;
  color: white;
  line-height: 1;
`;

const SubHeading = styled(Typography)`
  font-size: 24px;
  background-color: #ffffff;
`;
const Banner = () => {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <SubHeading>APP</SubHeading>
    </Image>
  );
};

export default Banner;
