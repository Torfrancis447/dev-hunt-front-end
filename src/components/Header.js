import React, { useContext } from "react";
import { Box, Grid, Typography, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import ApplicationForm from "./ApplicationForm";
// import { Avatar } from "@mui/icons-material";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  let history = useHistory();
  
  function handleLogout() {
    fetch("http://localhost:3000/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        localStorage.removeItem("userId");
        history.push("/login");
      }
    });
  }
console.log(user)
  return (
    <Box py={10} bgcolor="#332C39" color="white">
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={10}>
          <Box display="flex" justifyContent={user ? "space-around" : "center"}>
            {/* <Typography variant="h5"> Dev Hunt </Typography> */}
            {/* <Button sx={{ fontWeight: 600 }} component={Link} to="/edit-profile">
              Edit Profile
            </Button> */}
           
            {user && user.is_employer ? (
              <>
                <Button sx={{ fontWeight: 600 }} color="primary" component ={Link} to="/new-job" disableElevation>
                  Post a Job
                </Button>
                <Button sx={{ fontWeight: 600 }} component={Link} to="/employee-application">
                  {" "}
                  Applications{" "}
                </Button>
                {/* <Button sx={{ fontWeight: 600 }} component={Link} to="/applicants">
                  {" "}
                  Applicants
                </Button> */}
              </>
            ) : user ? (
              <>
              <Button sx={{ fontWeight: 600 }} component={Link} to="/my-applications">
                  {" "}
                 My Applications{" "}
                </Button>
                <Button sx={{ fontWeight: 600 }} component={Link} to="/home">
                  {" "}
                  Jobs{" "}
                </Button>
                <Button sx={{ fontWeight: 600 }} onClick={() => handleLogout()}>
                  {" "}
                  Logout{" "}
                </Button>
                <Box display="flex">
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                    }}
                    src={user.image_url}
                    alt={user.name}
                  />
                </Box>
              </>
            ) : (
              <>
              <Button sx={{ fontWeight: 600 }} component={Link} to="/">
                  {" "}
                 Home{" "}
                </Button>
                <Button sx={{ fontWeight: 600 }} component={Link} to="/signup">
                  {" "}
                  Signup{" "}
                </Button>
                <Button sx={{ fontWeight: 600 }} component={Link} to="/login">
                  {" "}
                  Login{" "}
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Header;
