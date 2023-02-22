import React, { useState} from "react"
import { Button, 
    Grid, 
    FilledInput,    
    MenuItem, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Select, 
    Typography,    
    Box,
    IconButton } from "@mui/material"
import { styled } from "@mui/system"
import theme from "../theme/theme";
import CancelIcon from "@mui/icons-material/Cancel"


const StyledSkills = styled(Box,{})({
margin: theme.spacing(0.5),
padding: theme.spacing(.75),
frontSize: "14.5px",
borderRadius: "5px",
fontWeight: 600,
cursor: "pointer",
color: theme.palette.secondary.main,
border: `1px solid ${theme.palette.secondary.main}`,
"&:hover" : {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff"
}
});
const skills = ["Javascript", "React", "Node"]


const NewJobModal = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
      <Dialog fullWidth open={open}>
      
        <DialogTitle>
        <Box display="flex "justifyContent="space-between" alignItems="center">

        
        Post Job
        <IconButton >
         <CancelIcon />   
        </IconButton>
        
        </Box>
        </DialogTitle>
        
        
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FilledInput placeholder="Job Title" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <Select
                
                variant="filled"
                defaultValue="Full Time"
                fullWidth
              >
                <MenuItem value="Full Time">Full Time</MenuItem>
                <MenuItem value="Part-Time">Part Time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <FilledInput placeholder="Company Name" fullWidth /> 
            </Grid>

            <Grid item xs={6}>
            <Select  variant="filled" defaultValue="Remote" fullWidth >
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
                <MenuItem value="In-office">In-Office</MenuItem>
            </Select> 
            </Grid>
            <Grid item xs={12}>
              <FilledInput placeholder="Description" fullWidth 
                multiline
                rows={4}
              /> 
            </Grid>
          </Grid>
          <Box mt={2}>
            <Typography>Skills:</Typography>
            <Box display="flex">           
                {skills.map((skill) => (<StyledSkills key={skill}>{skill}</StyledSkills>))}                
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
            <Box m={2} width="100%" display="flex" color ="red" justifyContent="space-between" alignItems="center">
                <Typography variant="caption">Required Fields</Typography>
                <Button variant="contained" color="primary" disableElevation> Post </Button>
            </Box>
        </DialogActions>
      </Dialog>
    );
};
export default NewJobModal