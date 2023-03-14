import { Grid, Box, Typography, Button, Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  IconButton, 
  FilledInput,
  Alert,
  MenuItem,
  Select
  } from "@mui/material"
import React, {useState, useContext, useEffect} from "react"
import CancelIcon from "@mui/icons-material/Cancel"
import { UserContext } from "../../context/user";
import { styled } from "@mui/system"
import theme from "../../theme/theme";

import { JobContext } from "../../context/job";
import { useHistory } from "react-router-dom";

const StyledSkills = styled(Box)(({ theme, selected }) => ({
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    fontWeight: 600,
    cursor: "pointer",
    color: selected ? "#fff" : theme.palette.secondary.main,
    backgroundColor: selected ? theme.palette.secondary.main : "transparent",
    border: `1px solid ${theme.palette.secondary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff"
    }
  }))

const EmployeeJobCard = ({ jobs, handleDelete, job, handleCurrentJob}) => {
  const[skills, setSkills]= useState([])  
  const [selectedSkills, setSelectedSkills] = useState([job.skills])   
  const {user, setUser}= useContext(UserContext)
  const {currentJob, setCurrentJob}=useContext(JobContext) 
  const [errors, setErrors] = useState([]);
  const [dialog, setDialog] = useState(false)
  const [formData, setFormData] = useState({
    id: job.id,
    title: job.title,
    description: job.description,
    compensation_type:job.compensation_type,
    compensation: job.compensation,    
    location: job.location,
    location_type: job.location_type,
    employment_type: job.employment_type,
    company_id: job.company_id,
    skills: job.skills
  })
  let history =useHistory() 

  const handleSkillClick = (skill) => {
    const selectedSkill = selectedSkills.find(s => s.id === skill.id);
    if (selectedSkill) {
      setSelectedSkills(selectedSkills.filter(s => s.id !== skill.id));
      setFormData({
        ...formData,
        skills: formData.skills.filter(s => s.id !== skill.id),
      });
    } else {
      setSelectedSkills([...selectedSkills, skill]);
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
  }

  const jobIndex = jobs.findIndex((j) => j.id === job.id)

  function openModal(){
  setDialog(true)
  }
  
  function closeModal(){
    setDialog(false)
  }

  function viewApplications(){
    handleCurrentJob()
    history.push('/applicants')
  }
 

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  }
 

  function handleSubmit(e){
    e.preventDefault()
    setErrors([])
    fetch(`http://localhost:3000/jobs/${job.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(formData)
    }).then((r) => r.json())
      .then((jobData) => {
        const userJobsArray = user.employee_data[0].jobs
        const updatedUser = {
          ...user,
          employee_data: [
            {
              ...user.employee_data[0],
              jobs: userJobsArray.map((job) => (job.id === jobData.id ? jobData : job)),
            },
          ],
        };
        setUser(updatedUser);
      })
      .catch((error)=>{
        setErrors(error.errors)
      })
  }

  

    return (
      
        <Grid p={2} container sx={{ boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)" }} alignItems="center">
          <Dialog open={dialog} fullWidth>
            <form onSubmit={handleSubmit}>
              <DialogTitle>
            <Box display="flex "justifyContent="space-between" alignItems="center">
                <Typography> Edit Job </Typography>
                <IconButton onClick={closeModal}>
                  <CancelIcon />
                </IconButton>
                </Box>
              </DialogTitle>
              
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FilledInput
                      onChange={handleChange}
                      name="title"
                      value={formData.title}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      onChange={handleChange}
                      name="employment_type"
                      value={formData.employment_type}
                      variant="filled"                     
                      fullWidth
                    >
                      <MenuItem value="full-time">Full Time</MenuItem>
                      <MenuItem value="part-Time">Part Time</MenuItem>
                      <MenuItem value="contract">Contract</MenuItem>
                    </Select>
                  </Grid>                 

                  <Grid item xs={6}>
                    <Select
                      onChange={handleChange}
                      variant="filled"
                      name="location_type"
                      value={formData.location_type}
                      fullWidth
                    >
                      <MenuItem value="remote">Remote</MenuItem>
                      <MenuItem value="hybrid">Hybrid</MenuItem>
                      <MenuItem value="on-site">On-Site</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <Select
                      onChange={handleChange}
                      variant="filled"
                      name="compensation_type"
                      value={formData.compensation_type}
                      fullWidth
                    >
                      <MenuItem value="Salary">Salary</MenuItem>
                      <MenuItem value="Hourly">Hourly</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={6}>
                    <FilledInput
                      onChange={handleChange}
                      name="compensation"
                      value={formData.compensation}
                      placeholder="Compensation Amount"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FilledInput
                      onChange={handleChange}
                      name="location"
                      value={formData.location}
                      placeholder="location"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FilledInput
                      onChange={handleChange}
                      name="description"
                      value={formData.description}
                      placeholder="Description"
                      fullWidth
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box mt={2}>
                      <Box display="flex" flexWrap="wrap">
                        {job.skills.map((skill, id) => (
                          <StyledSkills onClick={() => handleSkillClick(skill)} 
                          selected={selectedSkills.some((s) => s.id === skill.id)} key={id}>{skill.name}</StyledSkills>
                        ))}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button type="submit">Submit</Button>
              </DialogActions>
              {errors.map((error) => (
                <Alert severity="error" display="flex" key={error}>
                  {error}
                </Alert>
              ))}
            </form>
          </Dialog>
          <Grid item xs>
            <Typography variant="subitle1"> {job.title} </Typography>
            <Typography>Applicants: {job.application_count}</Typography>
          </Grid>
          <Grid item container direction="column" alignItems="flex-end" xs>
            <Grid item>
              <Typography variant="caption"></Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={() => setDialog(true)}>
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleDelete} variant="outlined">Delete</Button>
          </Grid>
          <Grid item>
            <Button onClick={viewApplications} variant="outlined" >View Applicants</Button>
          </Grid>
          
        </Grid>
      
    );
};

export default EmployeeJobCard