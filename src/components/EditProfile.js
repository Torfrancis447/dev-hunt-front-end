import React, { useState, useContext } from "react"
import { UserContext } from "../context/user";
import { Typography, TextField, Input } from "@mui/material";

const EditProfile = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState([])

    const { user, setUser } = useContext(UserContext)


    function handSubmit(){

    }

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
      <Input
          label="Image"
          type="file"          
          inputProps={{ accept: "image/*" }}
          onChange={(event) => setImage(event.target.files[0])}
          name="image"
        />
      <Button 
        variant="contained"
        color="primary"
        
        onClick={handleLogin}
      >
        Submit
      </Button>
        

        </Grid>

    )
};

export default EditProfile