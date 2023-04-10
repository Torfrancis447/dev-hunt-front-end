import React, { useEffect, useState, useContext } from "react";
import { Box, Grid } from "@mui/material";
import theme from "./theme/theme";
import Header from "./components/Header";
// import SearchBar from "./components/SearchBar";

import NewJobModal from "./components/EmployeeView/NewJobModal";
import LoginForm from "./components/LoginForm";
import { Switch, Route, useHistory } from "react-router-dom";
import JobList from "./components/JobList";
import SignUpForm from "./components/SignUpForm";
import { Image } from "@mui/icons-material";
import ApplicationForm from "./components/ApplicationForm";
import MyApplications from "./components/MyApplications";
import BasicMenu from "./components/BasicMenu";
import Hero from "./components/Hero";
import EditProfile from "./components/EditProfile";
import { UserContext } from "./context/user";
import JobContainer from "./components/EmployeeView/JobContainer";
import ApplicantsList from "./components/EmployeeView/ApplicantsList";
import NewJob from "./components/EmployeeView/NewJob";

function App() {
  let history = useHistory;

  const { user, setUser } = useContext(UserContext);
  // const [open, setOpen] = useState(false);

  // const handleOpenJob = () => {
  //   setOpen(true);
  // };

  // const handleCloseJob = () => {
  //   setOpen(false);
  // };

  return (
    <Box>
      <BasicMenu />
      <Header />

      <Switch>
        {user ? (
          <>
          
            <Route exact path="/">
              <Hero />
            </Route>

            <Route path="/home">
              {/* <NewJobModal /> */}
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <JobList />
                  {/* {user.is_employer ? <EmployeeApplications />: <JobList />} */}
                </Grid>
              </Grid>
            </Route>
            <Route path="/login">
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <LoginForm />
                </Grid>
              </Grid>
            </Route>
            <Route path="/signup">
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <SignUpForm />
                </Grid>
              </Grid>
            </Route>
            <Route path="/applicationform">
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <ApplicationForm />
                </Grid>
              </Grid>
            </Route>
            <Route path="/my-applications">
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <MyApplications />
                </Grid>
              </Grid>
            </Route>
            <Route path="/edit-profile">
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <EditProfile />
                </Grid>
              </Grid>
            </Route>
            <Route path="/NewJob">
              <NewJobModal />
            </Route>
            <Route path="/employee-application">
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <JobContainer />
                </Grid>
              </Grid>
            </Route>
            <Route path="/applicants">
            <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <ApplicantsList />
                </Grid>
            </Grid>
              
            </Route>
            <Route path="/new-job">
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <NewJob />
                </Grid>
              </Grid>
            </Route>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Hero />
            </Route>

            <Route path="/login">
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <LoginForm />
                </Grid>
              </Grid>
            </Route>
            <Route path="/signup">
              <Grid container justifyContent="center">
                <Grid item xs={10}>
                  <SignUpForm />
                </Grid>
              </Grid>
            </Route>
          </>
        )}
      </Switch>
    </Box>
  );
}

export default App;
