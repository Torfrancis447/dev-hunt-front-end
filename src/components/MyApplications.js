import React, { useContext, useEffect } from "react"
import { UserContext } from "../context/user"
import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material"
import MyApplicationCard from "./MyApplicationCard"

export default function MyApplications({}){

const {user, setUser} = useContext(UserContext)


// function getApplication(){ 
//     fetch(`http://localhost:3000/`)
//         .then(resp => resp.json())
//         .then((jobData) => {
//           console.log(jobData)          
//         })
// }
// useEffect(()=>(
//     fetch('http://localhost:3000/my_applications')
//     .then(resp => resp.json())
//         .then((Data) => {
//           setCompanies(companyData)
//         }) 
// ),[])


    return (
      <Box>
        <Grid 
          container
          justifyContent="space-evenly"
          p={2}
          mt={-5}
          mb={2}
          sx={{
            backgroundColor: "#FFFF",            
            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            
            flexDirection: "row",
            alignItems: "center",
          }}>
          
          <Grid item >
          <Typography variant="h5"color="#332C39" >My Applications: {user.jobs_applied_to}</Typography>
          </Grid>
          
          <Grid item>
            <Typography variant="h5"color="#332C39">Jobs Applied to this Month: {user.count_created_within_month}</Typography>
            </Grid>
            
          </Grid>
        {user ? user.job_applications.map((application)=>(
         <MyApplicationCard key={application.id} application={application}/>   
        )) : <Box display="flex" justifyContent="center"><CircularProgress/></Box>}
        
        </Box>

    )
};

