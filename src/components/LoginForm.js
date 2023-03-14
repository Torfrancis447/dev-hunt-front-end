import React, { useState, useContext } from 'react';
import { styled } from "@mui/system"
import {TextField, Button, Grid, Typography, Alert, Box} from '@mui/material';
import theme from "../theme/theme"
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';
import { Link } from 'react-router-dom';



export default function LoginForm() {

  const { user, setUser } = useContext(UserContext)
  
  let history = useHistory()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([])
  

  const handleLogin = () => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        if (r.ok) {
            r.json().then((userInfo) => {
              setUser(userInfo)           
              localStorage.userId = userInfo.id
              userInfo.employee_data.length === 0 ? history.push("/home") : history.push("/employee-application")
              console.log(userInfo.job_applications)
              
            })
            
        } else {
            r.json().then((error) => setErrors(error.errors))
        }
      })
      
  };


  return (
    <Grid
    alignItems="center"
    p={2}
    mt={-5}
    mb={2}
     sx={{
       backgroundColor: "#FFFF",
       boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
       borderRadius: "5px",
       display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',}}
       >
    {errors.map((error) => (
          <Alert severity="error" key={error}>{error}</Alert>
        ))}
    <Typography variant="h4"color="#332C39"> Login </Typography>
      <TextField
        label="Username"
        
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        margin="normal"
      />
      
      <Button 
        variant="contained"
        color="primary"        
        onClick={handleLogin}
      >
        Log In
      </Button>
      
    {/* </StyledBox> */}
    <Box p={.75}>
    <Typography variant= "subtitle1"> Don't Have an Account? <Link to="/signup">Sign up</Link></Typography>
    </Box>
    </Grid>
  );
}