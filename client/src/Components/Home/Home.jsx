import React from "react";
import Grid from "@mui/material/Grid2";

import Banner from "../Banner/Banner";
import Categories from "./Categories";
import Posts from "./Post/Posts";

const Home = () => {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item size={{ lg: 2, sm: 2, xs: 12 }}>
          <Categories />
        </Grid>
        <Grid item size={{ lg: 10, sm: 10, xs: 12 }}>
          <Posts />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
