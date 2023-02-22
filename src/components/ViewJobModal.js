import React,{ useState } from "react";
import { Box, Dialog, Button, DialogActions, DialogContent, Grid, DialogTitle, IconButton, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel"
import { useHistory } from "react-router-dom";
const ViewJobModal = ({job, handleClose}) => {
    // console.log(!!Object.keys(job).length)
const[loading, setLoading]=useState(false)
let history= useHistory()
function handleApplication(){
    localStorage.removeItem("job")
    localStorage.setItem("job", JSON.stringify(job))
    history.push('/applicationform')
    
    
}


    return (
      <Dialog open={!!Object.keys(job).length} fullWidth>
        <DialogTitle>
          <Box
            display="Flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {job.title}
            <IconButton onClick={handleClose}>
              <CancelIcon />
            </IconButton>
            <Box>{!!Object.keys(job).length && job.company.name}</Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Box display="flex">
              <Typography>Posted on:</Typography>
              <Typography>
                {!!Object.keys(job).length && job.created_at}
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
          <Box display="flex">
            {job.is_hourly === false ? (
              <Box>
                <Typography>${job.salary}</Typography>
              </Box>
            ) : (
              <Box>
                <Typography>${job.hourly}</Typography>
              </Box>
            )}
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