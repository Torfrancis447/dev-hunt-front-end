import React, { useState, useContext, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Grid, Typography, Button } from "@mui/material";
import Applicant from "./Applicant";
import { UserContext } from "../../context/user";
import { JobContext } from "../../context/job";
import { useHistory } from "react-router-dom";

const ApplicantsList = () => {
    const {user, setUser}=useContext(UserContext)
    const {currentJob, setCurrentJob}=useContext(JobContext)
    const [applications, setApplications]=useState([])
    const[isLoading, setIsLoading] = useState(false)
    let history = useHistory()
    
    useEffect(() => {    
        if(currentJob) {
            setIsLoading(false)   
        fetch(`http://localhost:3000/company_job_applications/${currentJob.id}`)
            .then(resp => resp.json())
            .then((applicationData) => {
                setApplications(applicationData)
                
            })
        } 
      }, [])
    
    
    const applicantCard = applications.map((applicant) => (
        <Applicant key={applicant.id} applicant={applicant}/>
    ));

  

    return (
        <Box>
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
            flexDirection: 'column'
            }}
         >
        {currentJob ? applications.map((applicant) => (
        <Applicant key={applicant.id} applicant={applicant}/>
    )): <h4> You have no Applicants </h4>}
       </Grid>
    </Box>
    );
};

export default ApplicantsList