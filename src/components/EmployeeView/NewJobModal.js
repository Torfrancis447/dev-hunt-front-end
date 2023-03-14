import React, { useState, useEffect, } from "react"
import { Button, 
    TextField,
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
    CircularProgress,
    IconButton } from "@mui/material"
import { styled } from "@mui/system"
import theme from "../../theme/theme";
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



const NewJobModal = ({open, handleCloseJob}) => {
  const[isLoading, setIsLoading] = useState(false) 
  const[skills, setSkills] = useState([])
  // const [open, setOpen] = useState(false);
  const [newSkill, setNewSkill]= useState({})
  const [skillModal, setSkillModal] =useState(false)

  const handleOpen = () => {
    setSkillModal(true);
  };

  const handleClose = () => {
    setSkillModal(false);
  };

// const handleOpenJob = () => {
//   setOpen(true);
// };
// const handleCloseJob = () => {
//     setOpen(false);
//   };
  

  // make this a POST to create the skill
  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:3000/skills')
        .then(resp => resp.json())
        .then((skillsData) => {
          setSkills(skillsData)           
          setIsLoading(false)

        })
}, [])

  function handleCreateSkill(e){
    e.preventDefault()
    const skillObj ={
      name: newSkill
    }
    fetch("http://localhost:3000/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(skillObj)
    }).then((response) => response.json())
       .then(console.log)
  }

    return (
      
      <Dialog fullWidth open={open}>
      
        <DialogTitle>
        <Box display="flex "justifyContent="space-between" alignItems="center">
        
        Post Job
        <IconButton onClick={handleCloseJob} >
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
            <Grid item xs={6}>
          <Select variant="filled" defaultValue="Salary" fullWidth >
                <MenuItem value="Salary">Salary</MenuItem>
                <MenuItem value="Hourly">Hourly</MenuItem>                
            </Select> 
            </Grid>
            <Grid item xs={6}>
              <FilledInput placeholder="Compensation Amount" fullWidth /> 
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
            <Button size="small" onClick={handleOpen} color="primary">Add New Skill</Button>
            <>      
            <Dialog open={skillModal} >
            <form onSubmit={handleCreateSkill}>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogContent>
                <TextField name="Skill Name" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} fullWidth />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}> Cancel </Button>
                <Button variant="contained" color="primary" type="submit">Create Skill</Button>
              </DialogActions>
              </form>
            </Dialog>
            </>
            {/* {isLoading ? <Box display="flex" justifyContent="center"><CircularProgress/></Box> : <Box display="flex" flexWrap={'wrap'}>           
                {skills.map((skill, id) => (<StyledSkills key={id}>{skill.name}</StyledSkills>))}                
            </Box> } */}
          </Box>
        </DialogContent>
        <DialogActions>
            <Box m={2} width="100%" display="flex" color ="red" justifyContent="space-between" alignItems="center">
                <Typography variant="caption">Required Fields*</Typography>
                <Button variant="contained" color="primary" disableElevation> Post </Button>
            </Box>
        </DialogActions>
      </Dialog>
    );
};
export default NewJobModal