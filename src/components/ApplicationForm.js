import React,{ useState } from "react"
import { useContext } from "react";
import { UserContext } from "../context/user";
import {TextField, Button, Grid, FormControlLabel, FormGroup, Checkbox, Input, Typography, Alert, Select, MenuItem} from '@mui/material'
import FormControl from "@mui/material";

const ApplicationForm = () => {
    const { user, setUser } = useContext(UserContext)

    const [availability, setAvailability] = useState('');
    const [sponsorship, setSponsorship] = useState(false);
    const [workAuthorization, setWorkAuthorization] = useState(false);    
    const [resume, setResume] = useState([])
    const [currentJob, setCurrentJob] =useState({})
    const [errors, setErrors]=useState([])
    let currentJobData = window.localStorage.getItem("job");
    
    const handleResumeChange = (e) => {
      
        setResume(e.target.files[0]);
        
    }
    
    const handleSubmit = (e) => {        
    e.preventDefault();
   
    setCurrentJob(JSON.parse(currentJobData));
    console.log(currentJobData.id)
    const data = new FormData();
    data.append("application[avaliability]", availability);
    data.append("application[sponsorship]", sponsorship);
    data.append("application[job_id]", currentJob.id);
    data.append("application[user_id]", user.id);
    data.append("application[resume]", resume) 
    
    console.log(data) 
    fetch("http://localhost:3000/apply", {
      method: "POST",
      body: data,
    }).then((r) => {
        if (r.ok) {
          r.json().then((applicationData) => {
            console.log(applicationData);
            localStorage.removeItem("job")
          });
        } else {
          r.json().then((error) => setErrors(error.errors));
        }
      });
    };


    return (
      <form onSubmit={handleSubmit}>
        <Grid
          container
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
          {/* <Grid item> */}
          <TextField
        required
        label="Availability"
        type="date"
        value={availability}
        onChange={(event) => setAvailability(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ marginBottom: 2 }}
      />
      <FormGroup row sx={{ marginBottom: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={sponsorship}
              onChange={(event) => setSponsorship(event.target.checked)}
            />
          }
          label="Do you require Sponsorship?"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={workAuthorization}
              onChange={(event) => setWorkAuthorization(event.target.checked)}
            />
          }
          label="Do you have Work authorization ?"
        />
      </FormGroup>
      <Input
        type="file"
        inputProps={{ accept: ".pdf,.doc,.docx" }}        
        onChange={handleResumeChange}
        sx={{ marginBottom: 2 }}
        
      />
      
      <Button variant="contained" type="submit">
        Submit
      </Button>
      {errors.map((error) => (
          <Alert severity="error" key={error}>
            {error}
          </Alert>
        ))}
          {/* </Grid> */}
        </Grid>
      </form>
    );
};
export default ApplicationForm