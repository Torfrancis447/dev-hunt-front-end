import React, {useEffect, useState} from "react";
import { Box, Grid, ThemeProvider } from "@mui/material"
import theme from "./theme/theme";
import Header from "./components/Header";
// import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import NewJobModal from "./components/NewJobModal";
import LoginForm from "./components/LoginForm";
import { Switch, Route, useHistory } from "react-router-dom";
import JobList from "./components/JobList"
import SignUpForm from "./components/SignUpForm";
import { Image } from "@mui/icons-material"
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationsList";
import BasicMenu from "./components/BasicMenu";
import Hero from "./components/Hero"
function App() {
let history =useHistory




  return (
    <Box>
    <BasicMenu />
      <Header />
      
      <Switch>
      <Route exact path="/">
       
        <Hero />
        
      </Route>
        <Route path='/home'>
          <NewJobModal />
          <Grid container justifyContent="center">
            <Grid item xs={10}>
              {/* <SearchBar /> */}
              <JobList />
              {/* <Image src={user.image_url}/> */}
            </Grid>
          </Grid>
        </Route>
        <Route path='/login'>
          <Grid container justifyContent="center">
            <Grid item xs={10}>
              <LoginForm />
            </Grid>
          </Grid>
        </Route>
        <Route path='/signup'>
        <Grid container justifyContent="center">
            <Grid item xs={10}>
              <SignUpForm />
            </Grid>
          </Grid>        
        </Route>
        <Route path='/applicationform'>
        <Grid container justifyContent="center">
            <Grid item xs={10}>
              <ApplicationForm />
            </Grid>
          </Grid>        
        </Route>
        <Route path='/application'>
        <Grid container justifyContent="center">
            <Grid item xs={10}>
              <ApplicationList />
            </Grid>
          </Grid>        
        </Route>
      </Switch>
    </Box>
  );
}

export default App;
