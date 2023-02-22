import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/system";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Alert,
  Input,
  Radio,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  FilledInput

} from "@mui/material";
import theme from "../theme/theme";
import { useHistory } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel"
import avatar from "../Assets/avatar.png"
import { UserContext } from "../context/user";
console.log(avatar)


export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState([]);
  const [name, setName] = useState("");
  const [isEmployer, setIsEmployer] = useState(false);
  const [errors, setErrors] = useState([]);
  const [companies, setCompanies] = useState([])
  const [open, setOpen] = useState(false)
  const [company, setCompany]=useState("")
  const[newCompanyName, setNewCompanyName] = useState('')
  const[newHeadquarters, setNewHeadquarters] = useState('')

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {    
    fetch('http://localhost:3000/companies')
        .then(resp => resp.json())
        .then((companyData) => {
          setCompanies(companyData)
        })
  }, [])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // function handleSubmit(){
  //   fetch('http://localhost:3000/', {
  //     method: "POST",
  //     body:
  //   })
  // }

  function handleRadioButton(e){
    setIsEmployer(e.target.value)
  }
  const handleSignUp = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user[image]", image);
    data.append("user[username]", username);
    data.append("user[name]", name);
    data.append("user[email]", email);
    data.append("user[is_employer]", isEmployer);
    data.append("user[password]", password);
    data.append("user[password_confirmation]", passwordConfirmation)
    company ? data.append("user[company_id]", company) : console.log(company);      
    fetch("http://localhost:3000/signup", {
      method: "POST",
      body: data,
    }).then((r) => {
      if (r.ok) {
        r.json().then((userInfo) => {
          setUser(userInfo);
          localStorage.userId = userInfo.id
        });
      } else {
        r.json().then((error) => setErrors(error.errors));
      }
    });
  };

  return (
    <form onSubmit={handleSignUp}>
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography> Sign Up </Typography>

        <Typography> UserName</Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          margin="normal"
        />
        <Typography> Password </Typography>
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          margin="normal"
        />
        <Typography> Password Confirmation</Typography>
        <TextField
          label="PasswordConfirmation"
          type="password"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          margin="normal"
        />
        <Typography> Name </Typography>
        <TextField
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          margin="normal"
        />
        <Typography> Email </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          margin="normal"
        />    
        <FormGroup row sx={{ marginBottom: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isEmployer}
              onChange={(event) => setIsEmployer(event.target.checked)}
            />
          }
          label="Are you an Employer?"
        />
        </FormGroup> 
        { isEmployer ?
        <>        
        <Typography> Company </Typography> 
        <Select onChange={(event) => setCompany(event.target.value)} variant="filled" defaultValue="" >
        {companies.map(({id, name}, index) => (
            <MenuItem  key={index} value={id}>
              {name}
            </MenuItem>
          ))}
            </Select>
            {/* <form onSubmit={ }>
        <Typography> Don't see your Company? </Typography>
        <Button onClick={handleOpen}> Click Here </Button>
              <Dialog open={open} fullWidth >
              <DialogTitle>
              <Typography> Company Name </Typography>
              <IconButton onClick={handleClose}>
                <CancelIcon />
              </IconButton>
              </DialogTitle>
              <DialogContent>
              <FilledInput onChange={(e) => setNewCompanyName(e.target.value)} placeholder="Company Headquaters" value={newCompanyName} />
              <FilledInput onChange={(e)=> setNewHeadquarters(e.target.value)} placeholder="Company Name" value={newHeadquarters} />
              </DialogContent>
              
              </Dialog>
              </form>           */}
            </>: <></> } 

        <br />
        <Input
          label="Image"
          type="file"          
          inputProps={{ accept: "image/*" }}
          onChange={(event) => setImage(event.target.files[0] ? event.target.files[0] : image )}
          name="image"
        />

        <br />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        

        {errors.map((error) => (
          <Alert severity="error" key={error}>
            {error}
          </Alert>
        ))}
        {/* </StyledBox> */}
      </Grid>
    </form>
  );
}
