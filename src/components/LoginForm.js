import React, { useState, useContext } from 'react';
import { styled } from "@mui/system"
import {TextField, Button, Grid, Typography, Alert} from '@mui/material';
import theme from "../theme/theme"
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/user';




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
              history.push("/home")
              localStorage.userId = userInfo.id
              console.log(userInfo.employee_data)
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
       display: "flex",
       boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
       boderRadius: "5px",
       display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',}}
       >
    
    <Typography> Login </Typography>
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
        Submit
      </Button>
      {errors.map((error) => (
          <Alert severity="error" key={error}>{error}</Alert>
        ))}
    {/* </StyledBox> */}
    </Grid>
  );
}