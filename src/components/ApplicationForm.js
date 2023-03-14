import React,{ useState, useContext } from "react"
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import {TextField, Button, Grid, FormControlLabel, FormGroup, Checkbox, Input, Typography, Alert, Select, MenuItem} from '@mui/material'
import FormControl from "@mui/material";
import { JobContext } from "../context/job";

const ApplicationForm = () => {
    const { user, setUser } = useContext(UserContext)
    const { currentJob, setCurrentJob } = useContext(JobContext)
    const [availability, setAvailability] = useState('');
    const [sponsorship, setSponsorship] = useState(false);
    const [workAuthorization, setWorkAuthorization] = useState(false);    
    const [resume, setResume] = useState([])   
    const [errors, setErrors]=useState([])
    let history =useHistory()
    
    const handleResumeChange = (e) => {
      
        setResume(e.target.files[0]);
        
    }
    
    const handleSubmit = (e) => {        
    e.preventDefault();  
    const data = new FormData();
    data.append("job_application[work_authorization]", workAuthorization)
    data.append("job_application[avaliability]", availability);
    data.append("job_application[sponsorship]", sponsorship);
    data.append("job_application[job_id]", currentJob.id);
    data.append("job_application[user_id]", user.id);
    data.append("job_application[resume]", resume) 
    
    
    fetch("http://localhost:3000/apply", {
      method: "POST",
      body: data,
    }).then((r) => {
        if (r.ok) {
          r.json().then((applicationData) => {
            console.log(applicationData);
            const newApplcation = user.
            setCurrentJob({})
            history.push("/home")
          });
        } else {
          r.json().then((error) => {            
            setErrors(error.errors)});
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
        <Grid mb={3} item>
        <Typography variant="h4"color="#332C39"> Application </Typography>
          {/* <Grid item> */}
          </Grid>
          <Grid item>
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
      </Grid>
     <Grid item >
      <FormGroup column="true" sx={{ marginBottom: 2 }}>
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
      </Grid>
      <Grid item>
      <Input        
        type="file"
        inputProps={{ accept: ".pdf,.doc,.docx" }}        
        onChange={handleResumeChange}
        sx={{ marginBottom: 2 }}
        
      />
      </Grid>
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