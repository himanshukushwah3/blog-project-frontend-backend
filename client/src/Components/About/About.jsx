import React from "react";
import { Box, styled, Typography, Link } from "@mui/material";
import { GitHub, Instagram, Email } from "@mui/icons-material";

const Banner = styled(Box)`
  background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
  width: 100%;
  height: 50vh;
  background-position: left 0px bottom 0px;
  background-size: cover;
`;

const Wrapper = styled(Box)`
  padding: 20px;
  & > h3,
  & > h5 {
    margin-top: 50px;
  }
`;

const Text = styled(Typography)`
  color: #878787;
`;

const About = () => {
  return (
    <Box>
      <Banner />
      <Wrapper>
        <Typography variant="h3">Lorem Epsom</Typography>
        <Text variant="h5">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci ut saepe eaque libero nisi eos modi expedita magni voluptatibus unde voluptatem, beatae, laborum rem quod? Ut ab sed nesciunt rerum?
          <br />
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, quidem!
          <Box component="span" style={{ marginLeft: 5 }}>
            <Link
              href="https://github.com/kunaltyagi9"
              color="inherit"
              target="_blank"
            >
              <GitHub />
            </Link>
          </Box>
        </Text>
        <Text variant="h5">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias ad tenetur necessitatibus consectetur fuga ipsum excepturi rem consequatur ducimus esse.
          <Box component="span" style={{ marginLeft: 5 }}>
            <Link
              href="https://www.instagram.com/codeforinterview/"
              color="inherit"
              target="_blank"
            >
              <Instagram />
            </Link>
          </Box>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, exercitationem.
          <Link
            href="mailto:codeforinterview@gmail.com?Subject=This is a subject"
            target="_blank"
            color="inherit"
          >
            <Email />
          </Link>
          .
        </Text>
      </Wrapper>
    </Box>
  );
};

export default About;
