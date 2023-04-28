import React, { useState, useContext } from "react";
import { UserContext } from "../../context/user";
import {
  Box,
  Typography,
  FilledInput,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel
} from "@mui/material";
import SkillSearch from "./SkillSearch";

const NewJob = () => {
  const { user, setUser } = useContext(UserContext);
  const [newJob, setNewJob] = useState({
    title: "",
    location_type: "Location Type",
    company_id: user.employee_data[0].company.id,
    location: "",
    compensation_type: "Compensation Type",
    compensation: "",
    description: "",
    employment_type: "Employment Type",
  });
  const [skillOptions, setSkillOptions] =useState([])

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setNewJob({ ...newJob, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newJobWithSkills = {
      ...newJob,
      jobSkills: skillOptions.map((skill) => skill.name),
    };
    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((response) => response.json())
      .then((jobData) => {
          const jobArray = user.employee_data[0].jobs
          jobArray.push(jobData);
        setUser({
          ...user,
          employee_data: [
            {
              ...user.employee_data[0],
              jobs: jobArray,
            },
          ],
        })
          setNewJob({
              title: "",
              location_type: "Location Type",
              company: user.employee_data[0].company.id,
              location: "",
              compensation_type: "Compensation Type",
              compensation: "",
              description: "",
              employment_type:"Employment Type",
            })
          })
          .catch()

          
  }
  
  const handleKeyDown = (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
            }
          }
          
  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      
      <Grid
        spacing={2}
        container
        // alignItems="center"
        justifyContent="center"
        mt={-5}
        sx={{
          backgroundColor: "#FFFF",
          boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
          borderRadius: "5px",
          // flexDirection: "column",
          // alignItems: "center",
        }}
      >
        <Grid item xs={10} >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            
          >
            <Grid item>
              <Typography variant="h5"color="#332C39" sx={{ fontWeight: 600 }}> Create New Job</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} md={8}>
          <FilledInput
            placeholder="Title"
            onChange={handleChange}
            value={newJob.title}
            name="title"
            
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={8}>
          <FilledInput
            onChange={handleChange}
            name="location"
            value={newJob.location}
            placeholder="Location"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} md={8}>
          <FilledInput
            onChange={handleChange}
            name="compensation"
            value={newJob.compensation}
            placeholder="Compensation Amount"
            fullWidth
            
          />
        </Grid>
        <Grid item xs={6} md={8}>
        
          <Select
            fullWidth
            label="Salary"
            onChange={handleChange}
            variant="filled"
            name="compensation_type"
            value={newJob.compensation_type}
            defaultValue="Compensation Type"
          >
            <MenuItem value="Compensation Type">Compensation Type</MenuItem>
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Hourly">Hourly</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6} md={8}>
          <Select
            
            onChange={handleChange}
            name="employment_type"
            value={newJob.employment_type}
            defaultValue="Employment Type"
            variant="filled"
            fullWidth
          >
            <MenuItem disabled value="Employment Type">Employment Type</MenuItem>
            <MenuItem value="full-time">Full Time</MenuItem>
            <MenuItem value="part-Time">Part Time</MenuItem>
            <MenuItem value="contract">Contract</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6} md={8}>
          <Select
            onChange={handleChange}
            variant="filled"
            name="location_type"
            value={newJob.location_type}
            defaultValue="Location Type"
            fullWidth
          >
            <MenuItem value="Location Type">Location Type</MenuItem>
            <MenuItem value="remote">Remote</MenuItem>
            <MenuItem value="hybrid">Hybrid</MenuItem>
            <MenuItem value="on-site">On-Site</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6} md={8}>
          <SkillSearch setSkillOptions={setSkillOptions}/>
          </Grid>
        <Grid item xs={6} md={8}>
          <TextField
            rows={4}
            multiline
            name="description"
            type="text"
            value={newJob.description}
            onChange={handleChange}
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item xs={10}>
          <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"            
            mb={5}
            >          
          
            <Grid item>
              <Button size="large" variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        
      </Grid>
    </form>
  );
};

export default NewJob;
