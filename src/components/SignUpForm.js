import React, { useState, useEffect, useContext, useRef } from "react";
import { styled } from "@mui/system";
import {
  Box,
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
  FilledInput,
  DialogActions,
  RadioGroup,
  FormLabel,
  FormControl,
} from "@mui/material";
import theme from "../theme/theme";
import { useHistory } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import avatar from "../Assets/avatar.png";
import { UserContext } from "../context/user";
import Portal from "@mui/base/Portal";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState([]);
  const [name, setName] = useState("");
  const [isEmployer, setIsEmployer] = useState(false);
  const [errors, setErrors] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [open, setOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newHeadquarters, setNewHeadquarters] = useState("");
  const { user, setUser } = useContext(UserContext);

  let history = useHistory();
  const portalRef = useRef(null);
  useEffect(() => {
    fetch("http://localhost:3000/companies")
      .then((resp) => resp.json())
      .then((companyData) => {
        setCompanies(companyData);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const newCompany = {
      name: newCompanyName,
      headquarters: newHeadquarters,
    };

    fetch("http://localhost:3000/new-company", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCompany),
    }).then((r) => {
      if (r.ok) {
        r.json().then((companyInfo) => {
          setNewCompanyName("");
          setNewHeadquarters("");
          setCompanies([...companies, companyInfo]);
        });
      } else {
        r.json().then((error) => setErrors(error.errors));
      }
    });
  }

  function handleRadioButton(e) {
    setIsEmployer(!isEmployer);
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("user[image]", image);
    data.append("user[username]", username);
    data.append("user[name]", name);
    data.append("user[email]", email);
    data.append("user[password]", password);
    data.append("user[password_confirmation]", passwordConfirmation);
    isEmployer
      ? data.append("user[company_id]", company) &&
        data.append("user[is_employer]", isEmployer)
      : data.append("user[is_employer]", isEmployer);
    fetch("http://localhost:3000/signup", {
      method: "POST",
      body: data,
    }).then((r) => {
      if (r.ok) {
        r.json().then((userInfo) => {
          setUser(userInfo);
          localStorage.userId = userInfo.id;
          history.push("/home");
        });
      } else {
        r.json().then((error) => setErrors(error.errors));
      }
    });
  };
  console.log(isEmployer);
  return (
    <>
      <form onSubmit={handleSignUp}>
        <Grid
          alignItems="center"
          p={2}
          mt={-5}
          mb={2}
          sx={{
            backgroundColor: "#FFFF",

            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" color="#332C39">
            {" "}
            Sign Up{" "}
          </Typography>
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

          <TextField
            label="PasswordConfirmation"
            type="password"
            value={passwordConfirmation}
            onChange={(event) => setPasswordConfirmation(event.target.value)}
            margin="normal"
          />

          <TextField
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            margin="normal"
          />

          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            margin="normal"
          />
          <Typography>Are you an Employer?</Typography>
          <FormGroup row sx={{ marginBottom: 1 }}>
            <RadioGroup row value={isEmployer} onChange={handleRadioButton}>
              <FormControlLabel control={<Radio />} value={true} label="yes" />
              <FormControlLabel control={<Radio />} value={false} label="no" />
            </RadioGroup>
          </FormGroup>

          {isEmployer ? (
            <>
              <Typography pb={1}> Company </Typography>
              <Select
                
                onChange={(event) => setCompany(event.target.value)}
                variant="filled"
                defaultValue=""
                sx={{ width: "21%" }}
              >
                {companies.map(({ id, name }, index) => (
                  <MenuItem key={index} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <Typography pt={1} > Don't see your Company? </Typography>
              <Button onClick={handleOpen}> Click Here </Button>
              <div ref={portalRef} />
            </>
          ) : null}

          <Input
            label="Image"
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={(event) => setImage(event.target.files[0])}
            name="image"
            sx={{ width: "210px" }}
          />
          <br></br>

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
      <Portal>
        <Dialog open={open} fullWidth>
          <form onSubmit={handleSubmit}>
            <DialogTitle>
              <Box
                display="Flex"
                p={2}
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography> Add Company </Typography>
                <IconButton onClick={handleClose}>
                  <CancelIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box p={1}>
                <TextField
                  label="Company Name"
                  variant="filled"
                  fullWidth
                  margin="dense"
                  required
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                />
                <TextField
                  label="Company Headquarters"
                  variant="filled"
                  fullWidth
                  margin="dense"
                  value={newHeadquarters}
                  onChange={(e) => setNewHeadquarters(e.target.value)}
                />
              </Box>
            </DialogContent>
            <DialogActions pr={4}>
              <Button
                onClick={handleClose}
                type="submit"
                variant="contained"
                color="secondary"
              >
                Add
              </Button>
            </DialogActions>
            {errors.map((error) => (
              <Alert severity="error" key={error}>
                {error}
              </Alert>
            ))}
          </form>
        </Dialog>
      </Portal>
    </>
  );
}
