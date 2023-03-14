import React, { useState, useContext } from "react"
import { UserContext } from "../context/user";
import { Typography, Grid, Button, TextField, Input } from "@mui/material";

const EditProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [name, setName] = useState(user.name);

    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
  }

    
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user[:id]", user.id)
    data.append("user[name]", name);
    data.append("user[username]", username);
    data.append("user[email]", email);
    if (password) {
      data.append("user[password]", password);
      data.append("user[password_confirmation]", passwordConfirmation);
    }
    if (image) {
      data.append("user[image]", image);
    }
    fetch(`http://localhost:3000/editprofile/${user.id}`, {
      method: "PATCH",
      body: data,
    })
      .then((r) => r.json())
      .then((updatedUser) => setUser(updatedUser));
  };

    return (
      <form onSubmit={handleSubmit}>
        <Grid
        p={2}
          mt={-5}
          mb={2}       
        spacing={2}
        container
        alignItems="center"
        sx={{
          backgroundColor: "#FFFF",
          boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
          boderRadius: "5px",          
            flexDirection: 'column',
            alignItems: 'center',}}
        >
        <Typography variant="h4"color="#332C39"> Edit Profile </Typography>
        <Grid item xs={6}>
        <Typography> Username </Typography>
      <TextField
        placeholder={user.username}        
        value={username}
        onChange={(event) => setUsername(event.target.value)}
       
      />
      </Grid>
      <Grid item xs={6}>
      <Typography> Name </Typography>
      <TextField
        placeholder={user.name}        
        value={name}
        onChange={(event) => setName(event.target.value)}
        
      />
      </Grid>
      <Grid item xs={6}>
      <TextField
        label="Password"
        type="password"        
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        
      />
      </Grid>
      <Grid item xs={6}>
      <TextField
        label="Password Conformation"
        type="password"        
        value={passwordConfirmation}
        onChange={(event) => setPasswordConfirmation(event.target.value)}
        
      />
      </Grid>
      <Grid item xs={4}>
      <Input
      
          label="Image"
          type="file"          
          inputProps={{ accept: "image/*" }}
          onChange={handleImageChange}
          name="image"
        />
      </Grid>
      <Button 
        variant="contained"
        color="primary"
        type="submit"       
      >
        Submit
      </Button>
        

        </Grid>
  </form>
    )
};

export default EditProfile