import React,{ useState, useContext } from "react";
import { Box, Dialog, Button, DialogActions, DialogContent, Grid, DialogTitle, IconButton, Typography, Chip} from "@mui/material";
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
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h5">{job.title}</Typography>
      <Typography variant="subtitle1">{!!Object.keys(job).length && job.company.name}</Typography>
      <IconButton onClick={handleClose}>
        <CancelIcon />
      </IconButton>
    </Box>
  </DialogTitle>
  <DialogContent>
    <Box mb={2}>
      <Box display="flex" alignItems="center">
        <Typography variant="subtitle2" color="textSecondary" mr={1}>Posted on:</Typography>
        <Typography variant="body1">{!!Object.keys(job).length && job.posted_time}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="subtitle2" color="textSecondary" mr={1}>Job Type:</Typography>
        <Typography variant="body1">{job.employment_type}</Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="subtitle2" color="textSecondary" mr={1}>Job Location:</Typography>
        <Typography variant="body1">{job.location_type}</Typography>
      </Box>
    </Box>
    <Box mb={2}>
      <Typography variant="subtitle2" color="textSecondary" mb={1}>Description:</Typography>
      <Typography variant="body1">{job.description}</Typography>
    </Box>
    <Box mb={2}>
      <Box display="flex" alignItems="center">
        <Typography variant="subtitle2" color="textSecondary" mr={1}>{job.compensation_type}:</Typography>
        <Typography variant="body1">${formattedNumber}</Typography>
      </Box>
    </Box>
    <Box mb={2}>
      <Typography variant="subtitle2" color="textSecondary" mb={1}>Skills:</Typography>
      <Grid container spacing={1}>
        {job.skills && job.skills.map((skill, id) => (
          <Grid key={id} item>
            <Chip label={skill.name} variant="outlined" size="small" />
          </Grid>
        ))}
      </Grid>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button variant="contained" color="primary" onClick={handleApplication}>Apply</Button>
  </DialogActions>
</Dialog>
    );
}
export default ViewJobModal