import { UserContext } from "../../context/user";
import React, { useState, useContext, useEffect } from "react";
import EmployeeJobCard from "./EmployeeJobCard";
import { Button, Grid, Box, CircularProgress} from "@mui/material";
import { JobContext } from "../../context/job";
import NewJobModal from "./NewJobModal";


const JobContainer = () => {
  const { user, setUser } = useContext(UserContext);
  const { currentJob, setCurrentJob } = useContext(JobContext);
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs]= useState([])
  useEffect(() => {
    if (user) {
      setIsLoading(false);
      setJobs(user.employee_data[0].jobs)
    }
  }, [user]);

  const handleOpenJob = () => {
    setOpen(true);
  };
  const handleCloseJob = () => {
      setOpen(false);
    };
    function handleDelete(job) {
    fetch(`http://localhost:3000/job/${job.id}`, { method: "DELETE" })
      .then((r) => {
        if(r.ok){
        const updatedJobs = user.employee_data[0].jobs.filter((j) => j.id !== job.id);        
        setUser({ ...user, employee_data: [{ ...user.employee_data[0], jobs: updatedJobs }] });
        }})
      .catch((error) => {
        console.error("Error deleting job:", error);
      })
    
  }
    
  

  return (    
      <Grid  p={2}
          mt={-5}
          mb={2}       
        spacing={2}
        container
        alignItems="center"
        sx={{
          backgroundColor: "#FFFF",
          boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
          borderRadius: '5px',       
            alignItems: 'center',}}
         >      
        <Grid item xs>
        {/* <Button onClick={handleOpenJob} variant="contained" color="primary" disableElevation >
          NewJob
        </Button> */}
        <NewJobModal open={open} handleCloseJob={handleCloseJob} />
          {isLoading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            jobs.map((job) => (
              <EmployeeJobCard handleDelete={()=>handleDelete(job)} handleCurrentJob={() => setCurrentJob(job)} jobs={jobs} job={job} key={job.id} id={job.id}/>
            ))
          )}
        </Grid>
      </Grid>
    
  );
};

export default JobContainer