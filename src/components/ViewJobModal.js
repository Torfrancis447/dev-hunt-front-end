import React,{ useState, useContext } from "react";
import { Box, Dialog, Button, DialogActions, DialogContent, Grid, DialogTitle, IconButton, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel"
import { useHistory } from "react-router-dom";
import { JobContext } from "../context/job";

const ViewJobModal = ({job, handleClose}) => {
  const { currentJob, setCurrentJob } = useContext(JobContext)

const[loading, setLoading]=useState(false)
let history= useHistory()
function handleApplication(){
    setCurrentJob(job)    
    history.push('/applicationform')
    
    
}

const number = job.compensation
const formattedNumber = number?.toLocaleString("en-US")


    return (
      <Dialog open={!!Object.keys(job).length} fullWidth>
        <DialogTitle>
          <Box
            display="Flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {job.title}
            <Box>{!!Object.keys(job).length && job.company.name}</Box>
            <IconButton onClick={handleClose}>
              <CancelIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box display="flex">
              <Typography>Posted on:</Typography>
              <Typography>
                {!!Object.keys(job).length && job.posted_time}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography> Job Type:</Typography>
              <Typography>{job.employment_type}</Typography>
            </Box>
            <Box display="flex">
              <Typography>Job Location:</Typography>
              <Typography>{job.location_type}</Typography>
            </Box>
          </Box>
          <Box>
          <Typography> Description: </Typography>
            {job.description}
          </Box>
          <Box display="flex">
            
              <Box>
                <Typography>{job.compensation_type}:</Typography>
              </Box>
            
              <Box>
                <Typography>${formattedNumber}</Typography>
              </Box>
            
          </Box>
          <Box>
          <Grid container justifyContent="space-between">
          <Typography> Skills: </Typography>
            {job.skills && job.skills.map((skill, id) => (
              <Grid key={id} item >
                {skill.name}
              </Grid>))}
              </Grid>
          </Box>
          
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={handleApplication}> Apply </Button>
        </DialogActions>
      </Dialog>
    );
}
export default ViewJobModal